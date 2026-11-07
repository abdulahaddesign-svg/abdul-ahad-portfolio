import { NextResponse } from 'next/server';
import { getStorageMetrics } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const metrics = await getStorageMetrics();
    return NextResponse.json(metrics);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to query storage metrics' },
      { status: 500 }
    );
  }
}
