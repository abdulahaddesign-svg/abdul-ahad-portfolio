import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getCapabilityCategories,
  getCapabilityTools,
  createCapabilityCategory,
  updateCapabilityCategory,
  deleteCapabilityCategory,
  reorderCapabilityCategories,
  createCapabilityTool,
  updateCapabilityTool,
  deleteCapabilityTool,
  reorderCapabilityTools,
  getSiteSettings,
  updateSiteSettings,
} from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeHidden = searchParams.get('all') === 'true';

    const [categories, tools, settings] = await Promise.all([
      getCapabilityCategories(includeHidden),
      getCapabilityTools(undefined, includeHidden),
      getSiteSettings(),
    ]);

    return NextResponse.json(
      {
        categories,
        tools,
        headline: settings.toolsHeadline || 'Tools & Capabilities',
        subheadline:
          settings.toolsSubheadline ||
          'A creative toolkit I use to research, design, create and build meaningful digital experiences.',
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch capabilities' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { entity, action, data } = body;

    let result: any = null;

    if (entity === 'headline') {
      const { headline, subheadline } = data;
      await updateSiteSettings({
        toolsHeadline: headline,
        toolsSubheadline: subheadline,
      });
      result = { headline, subheadline };
    } else if (entity === 'category') {
      if (action === 'create') {
        result = await createCapabilityCategory(data);
      } else if (action === 'update') {
        result = await updateCapabilityCategory(data.id, data);
      } else if (action === 'delete') {
        result = await deleteCapabilityCategory(data.id);
      } else if (action === 'reorder') {
        result = await reorderCapabilityCategories(data.orderedIds);
      }
    } else if (entity === 'tool') {
      if (action === 'create') {
        result = await createCapabilityTool(data);
      } else if (action === 'update') {
        result = await updateCapabilityTool(data.id, data);
      } else if (action === 'delete') {
        result = await deleteCapabilityTool(data.id);
      } else if (action === 'reorder') {
        result = await reorderCapabilityTools(data.categoryId, data.orderedIds);
      }
    } else {
      return NextResponse.json({ error: 'Invalid entity specified' }, { status: 400 });
    }

    // Invalidate cached pages
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/tools');

    // Return the full updated state directly so the client can synchronize without reloading
    const [categories, tools] = await Promise.all([
      getCapabilityCategories(true),
      getCapabilityTools(undefined, true),
    ]);

    return NextResponse.json({
      success: true,
      result,
      categories,
      tools,
    });
  } catch (error: any) {
    console.error('Capabilities API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to execute capabilities action' },
      { status: 500 }
    );
  }
}
