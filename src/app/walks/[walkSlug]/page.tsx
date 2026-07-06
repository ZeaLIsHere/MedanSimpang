import React from 'react';
import { getAllWalks } from '@/data/db';
import WalkDetailClient from './WalkDetailClient';

export async function generateStaticParams() {
  const walksList = getAllWalks();
  return walksList.map((w) => ({
    walkSlug: w.slug,
  }));
}

interface PageProps {
  params: Promise<{ walkSlug: string }> | { walkSlug: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <WalkDetailClient walkSlug={resolvedParams.walkSlug} />;
}
