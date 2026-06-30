import React from 'react';
import { getAllWalks, getLocationsForWalk } from '@/data/db';
import LocationDetailClient from './LocationDetailClient';

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
