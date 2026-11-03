import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await getSiteSettings();
  const resumeUrl = settings.resumeUrl || '/resume/abdul-ahad-resume.pdf';
  return NextResponse.redirect(new URL(resumeUrl, process.env.NEXT_PUBLIC_SITE_URL || 'https://abdulahad.live'));
}
