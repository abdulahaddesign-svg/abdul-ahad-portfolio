import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/lib/types';
import { INITIAL_PROJECTS } from '@/lib/constants';
import { mapRowToProject, mapProjectToRow, UUID_REGEX } from '@/lib/project-mapper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const featuredOnly = searchParams.get('featured') === 'true';
  const includeDrafts = searchParams.get('all') === 'true';

  const supabase = createClient();

  if (supabase) {
    try {
      if (slug) {
        const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle();
        if (!error && data) {
          return NextResponse.json(mapRowToProject(data));
        }
      } else if (id && UUID_REGEX.test(id)) {
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();
        if (!error && data) {
          return NextResponse.json(mapRowToProject(data));
        }
      } else {
        let query = supabase.from('projects').select('*').order('sort_order', { ascending: true });
        if (!includeDrafts) query = query.eq('is_published', true);
        if (featuredOnly) query = query.eq('is_featured', true);
        if (category && category !== 'All') query = query.eq('category', category);

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return NextResponse.json(data.map(mapRowToProject));
        }
      }
    } catch {
      // Fall through to local fallback
    }
  }

  // Fallback to local
  let filtered = [...INITIAL_PROJECTS];
  if (slug) {
    const found = filtered.find((p) => p.slug === slug);
    return found ? NextResponse.json(found) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  if (!includeDrafts) filtered = filtered.filter((p) => p.isPublished);
  if (featuredOnly) filtered = filtered.filter((p) => p.isFeatured);
  if (category && category !== 'All') filtered = filtered.filter((p) => p.category === category);
  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  try {
    const project: Partial<Project> = await req.json();

    if (!project.title || !project.slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
    }

    const row = mapProjectToRow(project);
    const supabase = createClient();

    if (supabase) {
      try {
        let savedData: any = null;

        // 1. If project has a valid UUID id, try updating by ID
        if (project.id && UUID_REGEX.test(project.id)) {
          const { data, error } = await supabase
            .from('projects')
            .update(row)
            .eq('id', project.id)
            .select()
            .maybeSingle();

          if (!error && data) {
            savedData = data;
          }
        }

        // 2. If not saved yet, check if a row with this slug already exists
        if (!savedData) {
          const { data: existing } = await supabase
            .from('projects')
            .select('id')
            .eq('slug', project.slug)
            .maybeSingle();

          if (existing?.id) {
            const { data, error } = await supabase
              .from('projects')
              .update(row)
              .eq('id', existing.id)
              .select()
              .single();
            if (!error && data) savedData = data;
          } else {
            // New insert
            const { data, error } = await supabase
              .from('projects')
              .insert({ ...row, created_at: new Date().toISOString() })
              .select()
              .single();
            if (!error && data) savedData = data;
          }
        }

        if (savedData) {
          // Invalidate cache immediately on all affected pages
          revalidatePath('/', 'layout');
          revalidatePath('/');
          revalidatePath('/work');
          revalidatePath(`/work/${project.slug}`);
          revalidatePath('/admin/projects');

          return NextResponse.json(mapRowToProject(savedData), { status: 201 });
        }
      } catch (dbErr: unknown) {
        console.error('Supabase project save error:', dbErr);
      }
    }

    // Fallback response if DB offline
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/work');
    revalidatePath('/admin/projects');
    return NextResponse.json(project, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save project';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (!id && !slug) {
      return NextResponse.json({ error: 'Project ID or slug required' }, { status: 400 });
    }

    const supabase = createClient();
    if (supabase) {
      try {
        let query = supabase.from('projects').delete();
        if (id && UUID_REGEX.test(id)) {
          query = query.eq('id', id);
        } else if (slug) {
          query = query.eq('slug', slug);
        } else if (id) {
          query = query.or(`id.eq.${id},slug.eq.${id}`);
        }
        await query;
      } catch (delErr) {
        console.error('Supabase project delete error:', delErr);
      }
    }

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/work');
    revalidatePath('/admin/projects');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete project';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
