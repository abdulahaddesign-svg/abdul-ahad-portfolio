import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/client';
import { ClientLogo } from '@/lib/types';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET() {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data) {
        return NextResponse.json(
          data.map((d: any) => ({
            id: d.id,
            name: d.name,
            logoUrl: d.logo_url || d.logoUrl,
            websiteUrl: d.website_url || d.websiteUrl,
            sortOrder: d.sort_order || d.sortOrder,
            isVisible: d.is_visible ?? d.isVisible,
            createdAt: d.created_at || d.createdAt,
          }))
        );
      }
    } catch {
      // Fallback
    }
  }
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  try {
    const client: Partial<ClientLogo> = await req.json();
    if (!client.name || !client.logoUrl) {
      return NextResponse.json(
        { error: 'Name and logoUrl are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    if (supabase) {
      const row = {
        name: client.name,
        logo_url: client.logoUrl,
        website_url: client.websiteUrl || '',
        sort_order: client.sortOrder ?? 1,
        is_visible: client.isVisible ?? true,
      };

      if (client.id && UUID_REGEX.test(client.id)) {
        const { data, error } = await supabase
          .from('clients')
          .update(row)
          .eq('id', client.id)
          .select()
          .single();
        if (!error && data) {
          revalidatePath('/');
          revalidatePath('/admin/clients');
          return NextResponse.json(data);
        }
      } else {
        const { data, error } = await supabase
          .from('clients')
          .insert({ ...row, created_at: new Date().toISOString() })
          .select()
          .single();
        if (!error && data) {
          revalidatePath('/');
          revalidatePath('/admin/clients');
          return NextResponse.json(data);
        }
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/clients');
    return NextResponse.json(client);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save client';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const supabase = createClient();
    if (supabase) {
      let query = supabase.from('clients').delete();
      if (UUID_REGEX.test(id)) {
        query = query.eq('id', id);
      } else {
        query = query.eq('name', id);
      }
      await query;
    }

    revalidatePath('/');
    revalidatePath('/admin/clients');
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete client';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
