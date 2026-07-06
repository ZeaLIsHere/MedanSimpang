import React from 'react';
import { getAllCerita } from '@/data/db';
import CeritaDetailClient from './CeritaDetailClient';

export async function generateStaticParams() {
  const stories = getAllCerita();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <CeritaDetailClient slug={resolvedParams.slug} />;
}
