import { NextRequest, NextResponse } from 'next/server';
import { submitInquiry } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, serviceRequired, budgetRange, details } = body;

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Name, email, and project details are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const newInquiry = await submitInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || '',
      serviceRequired: serviceRequired || 'Graphic Design & Visual Branding',
      budgetRange: budgetRange || 'Flexible',
      details: details.trim(),
    });

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error occurred.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
