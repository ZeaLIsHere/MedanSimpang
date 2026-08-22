import React from 'react';
import type { Metadata } from 'next';
import { getAllCerita, getCeritaBySlug } from '@/data/db';
import CeritaDetailClient from './CeritaDetailClient';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getCeritaBySlug(slug);
  if (!story) return { title: 'Cerita tidak ditemukan' };

  const url = `https://urbanmorphsoc.com/medansimpang/cerita/${story.slug}/`;
  return {
    title: story.title_id,
    description: story.excerpt_id,
    alternates: { canonical: url },
    openGraph: {
      title: `${story.title_id} | Medan Simpang`,
      description: story.excerpt_id,
      url,
      type: 'article',
      publishedTime: story.publishedDate,
      images: [{ url: story.coverImage, alt: story.title_id }],
    },
  };
}

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
