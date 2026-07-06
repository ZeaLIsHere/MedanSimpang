import rawSeedData from './seed.json';
import { Kawasan, Walk, Location, Cerita } from '@/types';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Recursively prefix any local asset path (starts with "/images") with the
// configured basePath, so images resolve correctly when the app is served
// under a subpath (e.g. namadomain/medansimpang). next/image with
// `unoptimized` does NOT apply basePath automatically, so we do it here at the
// single data-access boundary.
function withBasePath<T>(value: T): T {
  if (typeof value === 'string') {
    return (value.startsWith('/images') && !value.startsWith(`${BASE_PATH}/images`)
      ? `${BASE_PATH}${value}`
      : value) as T;
  }
  if (Array.isArray(value)) {
    return value.map(withBasePath) as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = withBasePath(v);
    }
    return out as T;
  }
  return value;
}

const seedData = withBasePath(rawSeedData);

// Cast JSON data to typed arrays
const kawasanList = seedData.kawasan as Kawasan[];
const walksList = seedData.walks as Walk[];
const locationsList = seedData.locations as Location[];
const ceritaList = seedData.cerita as Cerita[];

export function getAllKawasan(): Kawasan[] {
  return kawasanList;
}

export function getKawasanBySlug(slug: string): Kawasan | undefined {
  return kawasanList.find(k => k.slug === slug);
}

export function getAllWalks(): Walk[] {
  return walksList;
}

export function getWalkBySlug(slug: string): Walk | undefined {
  return walksList.find(w => w.slug === slug);
}

export function getWalksForKawasan(kawasanSlug: string): Walk[] {
  return walksList.filter(w => w.neighbourhoodSlug === kawasanSlug);
}

export function getAllLocations(): Location[] {
  return locationsList;
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locationsList.find(l => l.slug === slug);
}

export function getLocationsForWalk(walkSlug: string): Location[] {
  const walk = getWalkBySlug(walkSlug);
  if (!walk) return [];
  
  // Return locations ordered by their position in walk.locationSlugs
  return walk.locationSlugs
    .map(slug => locationsList.find(l => l.slug === slug))
    .filter((l): l is Location => !!l);
}

export function getAllCerita(): Cerita[] {
  return ceritaList;
}

export function getCeritaBySlug(slug: string): Cerita | undefined {
  return ceritaList.find(c => c.slug === slug);
}

export function getCeritaByFilters(kawasanSlug?: string, category?: string): Cerita[] {
  return ceritaList.filter(c => {
    const matchesKawasan = !kawasanSlug || c.neighbourhoodSlug === kawasanSlug;
    const matchesCategory = !category || c.categories.includes(category);
    return matchesKawasan && matchesCategory;
  });
}

export function getAllCeritaCategories(): string[] {
  const categories = new Set<string>();
  ceritaList.forEach(c => {
    c.categories.forEach(cat => categories.add(cat));
  });
  return Array.from(categories);
}
