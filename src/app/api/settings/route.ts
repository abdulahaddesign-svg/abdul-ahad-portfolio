import { NextRequest, NextResponse } from 'next/server';
import { updateSiteSettings, getSiteSettings } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateSiteSettings(body);
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/services');
    revalidatePath('/work');
    revalidatePath('/contact');
    revalidatePath('/resume');
    revalidatePath('/admin/settings');
    revalidatePath('/admin/homepage');
    revalidatePath('/admin/about');
    revalidatePath('/admin/content');
    revalidatePath('/admin/resume');
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
