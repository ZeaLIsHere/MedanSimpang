import React from 'react';
import type { Metadata } from 'next';
import { getAllWalks, getWalkBySlug } from '@/data/db';
import WalkDetailClient from './WalkDetailClient';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { walkSlug } = await params;
  const walk = getWalkBySlug(walkSlug);
  if (!walk) return { title: 'Rute tidak ditemukan' };

  const url = `https://urbanmorphsoc.com/medansimpang/walks/${walk.slug}/`;
  const description = walk.description_id.slice(0, 158);
  return {
    title: `${walk.title_id} — Heritage Walk Kota Medan`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${walk.title_id} | Medan Simpang`,
      description,
      url,
      images: [{ url: walk.heroImage, alt: `${walk.title_id}, rute Medan Simpang` }],
    },
  };
}

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
