import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createClient } from '@/lib/supabase/client';
import { isR2Configured, uploadToR2 } from '@/lib/storage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB limit

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
  eps: 'application/postscript',
  ai: 'application/illustrator',
  psd: 'image/vnd.adobe.photoshop',
};

function resolveMimeType(fileName: string, providedMime: string | undefined): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  if (EXT_TO_MIME[ext]) {
    return EXT_TO_MIME[ext];
  }
  if (providedMime && providedMime !== 'application/octet-stream') {
    return providedMime;
  }
  return 'application/octet-stream';
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data.' }, { status: 400 });
    }

    // 1. File size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowed limit of 15MB.' },
        { status: 400 }
      );
    }

    // 2. Extension & MIME detection
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const computedMime = resolveMimeType(file.name, file.type);

    const isImage = computedMime.startsWith('image/') || computedMime === 'application/pdf';
    const isKnownExt = Boolean(EXT_TO_MIME[fileExt]);

    if (!isImage && !isKnownExt) {
      return NextResponse.json(
        {
          error:
            'Unsupported file format. Please upload JPG, PNG, WEBP, SVG, GIF, AVIF, or PDF.',
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // =========================================================================
    // TIER 1: Cloudflare R2 Storage (High-Performance Edge CDN)
    // =========================================================================
    if (isR2Configured()) {
      try {
        const r2Url = await uploadToR2(
          buffer,
          file.name,
          computedMime
        );
        return NextResponse.json({
          url: r2Url,
          name: file.name,
          size: file.size,
          provider: 'cloudflare-r2',
        });
      } catch (r2Error) {
        console.error('Cloudflare R2 upload error, attempting fallback:', r2Error);
      }
    }

    // =========================================================================
    // TIER 2: Supabase Storage ('portfolio-media' Bucket)
    // =========================================================================
    const supabase = createClient();
    if (supabase) {
      try {
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${cleanName}`;
        const filePath = `uploads/${uniqueName}`;

        const { data, error } = await supabase.storage
          .from('portfolio-media')
          .upload(filePath, buffer, {
            contentType: computedMime,
            cacheControl: '31536000',
            upsert: true,
          });

        if (!error && data) {
          const {
            data: { publicUrl },
          } = supabase.storage.from('portfolio-media').getPublicUrl(filePath);

          return NextResponse.json({
            url: publicUrl,
            name: file.name,
            size: file.size,
            provider: 'supabase-storage',
          });
        }

        if (error) {
          console.error('Supabase Storage upload error:', error.message);
        }
      } catch (supaError) {
        console.error('Supabase Storage fallback exception:', supaError);
      }
    }

    // =========================================================================
    // TIER 3: Local Filesystem Storage (public/uploads/) — Local Dev Only
    // =========================================================================
    if (!process.env.VERCEL) {
      try {
        const cleanName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadDir, cleanName), buffer);

        return NextResponse.json({
          url: `/uploads/${cleanName}`,
          name: file.name,
          size: file.size,
          provider: 'local-filesystem',
        });
      } catch (fsError) {
        console.error('Local filesystem upload error:', fsError);
      }
    }

    // =========================================================================
    // TIER 4: Inline Data URL Fallback (For smaller media assets <= 1.5MB)
    // =========================================================================
    if (buffer.length <= 1.5 * 1024 * 1024) {
      const base64Data = `data:${computedMime};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        url: base64Data,
        name: file.name,
        size: file.size,
        provider: 'base64-fallback',
        fallback: true,
      });
    }

    return NextResponse.json(
      {
        error:
          'Storage service is temporarily unavailable and file is too large for inline fallback. Please try again in a moment.',
      },
      { status: 503 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
