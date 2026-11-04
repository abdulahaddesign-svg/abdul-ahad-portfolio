/**
 * Client-Side Media Upload Utility
 * Uploads media files directly to Supabase Storage (bypassing Vercel's 4.5MB Serverless body limit),
 * with automatic fallback to /api/upload.
 */

export async function uploadMedia(file: File): Promise<{ url: string; name: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kptxbhhiucgdfqutxwjj.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_XqV2m12hiw4_TrdV_YhTsw_PNEi3rZB';

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniquePath = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${cleanName}`;

  // 1. Primary Strategy: Direct Supabase Storage REST API Upload (bypasses 4.5MB Vercel limit)
  if (supabaseUrl && supabaseKey) {
    try {
      const uploadEndpoint = `${supabaseUrl}/storage/v1/object/portfolio-media/${uniquePath}`;
      const res = await fetch(uploadEndpoint, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': file.type || 'application/octet-stream',
          'x-upsert': 'true',
        },
        body: file,
      });

      if (res.ok) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio-media/${uniquePath}`;
        return { url: publicUrl, name: file.name };
      }
    } catch (directErr) {
      console.warn('Direct Supabase Storage upload failed, trying /api/upload fallback:', directErr);
    }
  }

  // 2. Secondary Strategy: Server-side /api/upload Route
  const formData = new FormData();
  formData.append('file', file);

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
      throw new Error('File size is too large. Please upload an image under 10MB.');
    }
    throw new Error(`Upload failed (${res.status}): ${text.substring(0, 100)}`);
  }

  if (!res.ok || !data.url) {
    throw new Error(data.error || 'Upload failed. Please check file format.');
  }

  return { url: data.url, name: file.name };
}
