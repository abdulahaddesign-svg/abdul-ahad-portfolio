import { NextRequest, NextResponse } from 'next/server';
import { 
  getProjectCategories, 
  saveProjectCategories, 
  renameProjectCategory, 
  deleteProjectCategory 
} from '@/lib/data';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const categories = await getProjectCategories();
    return NextResponse.json({ categories }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.action === 'rename') {
      const { oldName, newName } = body;
      if (!oldName || !newName) {
        return NextResponse.json({ error: 'Both oldName and newName are required.' }, { status: 400 });
      }
      await renameProjectCategory(oldName, newName);
    } else if (body.action === 'delete') {
      const { name } = body;
      if (!name) {
        return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });
      }
      await deleteProjectCategory(name);
    } else if (body.action === 'add') {
      const { name } = body;
      if (!name || !name.trim()) {
        return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });
      }
      const current = await getProjectCategories();
      const trimmed = name.trim();
      if (!current.includes(trimmed)) {
        await saveProjectCategories([...current, trimmed]);
      }
    } else if (Array.isArray(body.categories)) {
      await saveProjectCategories(body.categories);
    } else {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const categories = await getProjectCategories();

    // Revalidate paths that use categories
    revalidatePath('/', 'layout');
    revalidatePath('/work');
    revalidatePath('/admin/projects');

    return NextResponse.json({ success: true, categories });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update categories' },
      { status: 500 }
    );
  }
}
