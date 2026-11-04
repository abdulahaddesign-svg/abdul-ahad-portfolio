import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getExperiences, saveExperience, deleteExperience } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    const experiences = await getExperiences(all);
    return NextResponse.json(experiences);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch experience' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const saved = await saveExperience(body);
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/experience');
    revalidatePath('/admin/about');
    return NextResponse.json(saved, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save experience' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const success = await deleteExperience(id);
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/experience');
    revalidatePath('/admin/about');
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete experience' }, { status: 500 });
  }
}
