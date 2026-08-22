import React from 'react';
import type { Metadata } from 'next';
import { getResearchProject, RESEARCH_PROJECTS } from '@/data/researchProjects';
import ProjectDetailClient from './ProjectDetailClient';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return RESEARCH_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getResearchProject(slug);
  if (!project) return { title: 'Project tidak ditemukan' };

  const url = `https://urbanmorphsoc.com/projects/${project.slug}/`;
  return {
    title: project.title,
    description: project.summaryId,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | UrbanMorphSoc`,
      description: project.summaryId,
      url,
      type: 'article',
      images: [{ url: project.image, alt: project.imageAltId }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getResearchProject(slug);
  if (!project) return null;
  return <ProjectDetailClient project={project} />;
}
