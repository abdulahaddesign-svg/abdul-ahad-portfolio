import { NextResponse } from 'next/server';
import { getServices, createService, updateService, deleteService } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeUnpublished = searchParams.get('all') === 'true';
  const services = await getServices(includeUnpublished);
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newService = await createService(body);
    return NextResponse.json(newService, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }
    const updated = await updateService(body);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }
    const success = await deleteService(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete service' }, { status: 500 });
  }
}
