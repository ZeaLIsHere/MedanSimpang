import React from 'react';
import { getAllKawasan } from '@/data/db';
import KawasanDetailClient from './KawasanDetailClient';

export async function generateStaticParams() {
  const kawasanList = getAllKawasan();
  return kawasanList.map((k) => ({
    slug: k.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <KawasanDetailClient slug={resolvedParams.slug} />;
}
