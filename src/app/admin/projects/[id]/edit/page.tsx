import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/data';
import { ProjectForm } from '../../ProjectForm';

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectForm initialData={project} />;
}
