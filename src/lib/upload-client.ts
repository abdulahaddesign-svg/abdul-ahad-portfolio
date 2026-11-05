/**
 * Client-Side Media Upload Utility
 * Uploads media files directly to Supabase Storage (bypassing Vercel's 4.5MB Serverless body limit),
 * with automatic fallback to /api/upload.
 */

const EXT_TO_MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  jfif: 'image/jpeg',
  pjpeg: 'image/jpeg',
  pjp: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  avif: 'image/avif',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
  cur: 'image/x-icon',
  tiff: 'image/tiff',
  tif: 'image/tiff',
  heic: 'image/heic',
  heif: 'image/heif',
  pdf: 'application/pdf',
};

function resolveClientMimeType(fileName: string, providedType: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  if (EXT_TO_MIME[ext]) {
    return EXT_TO_MIME[ext];
  }
  if (providedType && providedType !== 'application/octet-stream') {
    return providedType;
  }
  return 'image/jpeg';
}

/**
 * Resizes/compresses raster images in browser if file is too large for serverless endpoints.
 */
async function compressImageIfNeeded(file: File, maxSizeBytes: number = 4 * 1024 * 1024): Promise<File | Blob> {
  if (typeof window === 'undefined' || file.size <= maxSizeBytes) {
    return file;
  }

  // Never touch SVGs or PDFs
  if (file.type.includes('svg') || file.type.includes('pdf') || file.name.endsWith('.svg') || file.name.endsWith('.pdf')) {
    return file;
  }

  return new Promise((resolve) => {
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const maxDimension = 2400;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(file);
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob && blob.size < file.size) {
              const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          0.85
        );
      };
      img.onerror = () => resolve(file);
      img.src = url;
    } catch {
      resolve(file);
    }
  });
}

export async function uploadMedia(file: File): Promise<{ url: string; name: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kptxbhhiucgdfqutxwjj.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_XqV2m12hiw4_TrdV_YhTsw_PNEi3rZB';

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniquePath = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${cleanName}`;
  const computedMime = resolveClientMimeType(file.name, file.type);

  // 1. Primary Strategy: Direct Supabase Storage REST API Upload (bypasses 4.5MB Vercel limit)
  if (supabaseUrl && supabaseKey) {
    try {
      const uploadEndpoint = `${supabaseUrl}/storage/v1/object/portfolio-media/${uniquePath}`;
      const res = await fetch(uploadEndpoint, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': computedMime,
          'x-upsert': 'true',
        },
        body: file,
      });

      if (res.ok) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio-media/${uniquePath}`;
        return { url: publicUrl, name: file.name };
      } else {
        const errText = await res.text().catch(() => '');
        console.warn(`Direct Supabase Storage upload returned ${res.status}:`, errText);
      }
    } catch (directErr) {
      console.warn('Direct Supabase Storage upload failed, trying /api/upload fallback:', directErr);
    }
  }

  // 2. Secondary Strategy: Server-side /api/upload Route
  const uploadPayload = await compressImageIfNeeded(file);
  const formData = new FormData();
  formData.append('file', uploadPayload, file.name);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const text = await res.text();
  let data: any = {};
  try {
    data = JSON.parse(text);
  } catch {
    if (res.status === 413 || text.includes('FUNCTION_PAYLOAD_TOO_LARGE')) {
      throw new Error('File size exceeds serverless limits. Please upload an image under 10MB.');
    }
    throw new Error(`Upload failed (${res.status}): ${text.substring(0, 100)}`);
  }

  if (!res.ok || !data.url) {
    const errorMsg = data.error || data.message || `Upload failed (${res.status}). Please verify the file format and size.`;
    throw new Error(errorMsg);
  }

  return { url: data.url, name: file.name };
}
