import React from 'react';
import type { Metadata } from 'next';
import { getAllWalks, getLocationsForWalk, getLocationBySlug } from '@/data/db';
import LocationDetailClient from './LocationDetailClient';

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { walkSlug, locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  if (!location) return { title: 'Lokasi tidak ditemukan' };

  const url = `https://urbanmorphsoc.com/medansimpang/walks/${walkSlug}/lokasi/${location.slug}/`;
  const description = location.shortDescription_id.slice(0, 158);
  const image = location.gallery[0] || location.thumbnail;
  return {
    title: `${location.name_id} — Lokasi Medan Simpang`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${location.name_id} | Medan Simpang`,
      description,
      url,
      images: [{ url: image, alt: `${location.name_id}, ${location.address_id}` }],
    },
  };
}

export async function generateStaticParams() {
  const walks = getAllWalks();
  const paramsList: { walkSlug: string; locationSlug: string }[] = [];

  for (const walk of walks) {
    const locations = getLocationsForWalk(walk.slug);
    for (const loc of locations) {
      paramsList.push({
        walkSlug: walk.slug,
        locationSlug: loc.slug,
      });
    }
  }

  return paramsList;
}

interface PageProps {
  params: Promise<{ walkSlug: string; locationSlug: string }> | { walkSlug: string; locationSlug: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <LocationDetailClient
      walkSlug={resolvedParams.walkSlug}
      locationSlug={resolvedParams.locationSlug}
    />
  );
}
