import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createClient } from '@/lib/supabase/client';
import { isR2Configured, uploadToR2 } from '@/lib/storage';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'application/pdf',
]);

const ALLOWED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'svg',
  'gif',
  'pdf',
]);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. File size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowed limit of 10MB.' },
        { status: 400 }
      );
    }

    // 2. File type validation
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = file.type || '';

    const isValidType =
      ALLOWED_MIME_TYPES.has(mimeType) || ALLOWED_EXTENSIONS.has(fileExt);

    if (!isValidType) {
      return NextResponse.json(
        {
          error:
            'Unsupported file format. Please upload JPG, PNG, WEBP, SVG, GIF, or PDF.',
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
          mimeType || 'application/octet-stream'
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
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `uploads/${uniqueName}`;

        const { data, error } = await supabase.storage
          .from('portfolio-media')
          .upload(filePath, buffer, {
            contentType: mimeType || undefined,
            cacheControl: '31536000',
            upsert: false,
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
      } catch (supaError) {
        console.error('Supabase Storage fallback error:', supaError);
      }
    }

    // =========================================================================
    // TIER 3: Local Filesystem Storage (public/uploads/)
    // =========================================================================
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
      console.error('Local filesystem upload error, reverting to Data URL:', fsError);
    }

    // =========================================================================
    // TIER 4: Inline Data URL Fallback
    // =========================================================================
    const base64Data = `data:${mimeType || 'application/octet-stream'};base64,${buffer.toString('base64')}`;
    return NextResponse.json({
      url: base64Data,
      name: file.name,
      size: file.size,
      provider: 'base64-fallback',
      fallback: true,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
