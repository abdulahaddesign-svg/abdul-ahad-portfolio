import { NextRequest, NextResponse } from 'next/server';
import { updateSiteSettings, getSiteSettings } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateSiteSettings(body);
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/resume');
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
