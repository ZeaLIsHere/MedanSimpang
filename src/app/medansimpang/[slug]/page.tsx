import React from 'react';
import type { Metadata } from 'next';
import { getAllKawasan, getKawasanBySlug } from '@/data/db';
import KawasanDetailClient from './KawasanDetailClient';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const kawasan = getKawasanBySlug(slug);
  if (!kawasan) return { title: 'Kawasan tidak ditemukan' };

  const url = `https://urbanmorphsoc.com/medansimpang/${kawasan.slug}/`;
  return {
    title: `${kawasan.name} — Rute Jalan Kaki dan Warisan Kota Medan`,
    description: kawasan.tagline_id,
    alternates: { canonical: url },
    openGraph: {
      title: `${kawasan.name} | Medan Simpang`,
      description: kawasan.tagline_id,
      url,
      images: [{ url: kawasan.coverImage, alt: `${kawasan.name}, kawasan heritage walk Medan Simpang` }],
    },
  };
}

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
