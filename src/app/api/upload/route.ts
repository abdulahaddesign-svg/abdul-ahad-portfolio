import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createClient } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check size limit: 15MB
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 15MB limit.' }, { status: 400 });
    }

    // If Supabase is configured with active credentials, attempt upload to Supabase Storage
    const supabase = createClient();
    if (supabase) {
      try {
        const fileExt = file.name.split('.').pop() || 'bin';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { data, error } = await supabase.storage
          .from('portfolio-media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (!error && data) {
          const { data: { publicUrl } } = supabase.storage
            .from('portfolio-media')
            .getPublicUrl(filePath);

          return NextResponse.json({ url: publicUrl, name: file.name });
        }
      } catch {
        // Fall back to local file storage
      }
    }

    // Server-side local file persistence in public/uploads/
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileExt = file.name.split('.').pop() || 'dat';
      const cleanName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, cleanName), buffer);

      return NextResponse.json({
        url: `/uploads/${cleanName}`,
        name: file.name,
      });
    } catch {
      // Data URL fallback
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = file.type || 'application/octet-stream';
      const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

      return NextResponse.json({
        url: base64Data,
        name: file.name,
        fallback: true,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
