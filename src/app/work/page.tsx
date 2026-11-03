import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/data';
import { WorkArchiveClient } from './WorkArchiveClient';

export const metadata: Metadata = {
  title: 'Selected Work & Design Portfolio',
  description:
    'Explore brand identity systems, social media collaterals, mobile-first UI/UX case studies, packaging dielines, and kinetic motion graphics by Abdul Ahad J.',
};

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getProjects({ includeDrafts: false });

  return <WorkArchiveClient initialProjects={projects} />;
}
