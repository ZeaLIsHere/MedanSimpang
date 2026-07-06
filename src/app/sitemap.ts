import type { MetadataRoute } from 'next';
import {
  getAllKawasan,
  getAllWalks,
  getLocationsForWalk,
  getAllCerita,
} from '@/data/db';

const BASE_URL = 'https://urbanmorphsoc.com/medansimpang';

// Static export requires a fully static sitemap
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes
  const staticPaths = [
    '',
    '/cerita',
    '/tentang/visi',
    '/tentang/mitra',
    '/tentang/tim',
    '/tentang/perjalanan',
    '/tentang/metodologi',
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE_URL}${p}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));

  // Kawasan
  for (const k of getAllKawasan()) {
    entries.push({
      url: `${BASE_URL}/kawasan/${k.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Walks + their locations
  for (const w of getAllWalks()) {
    entries.push({
      url: `${BASE_URL}/walks/${w.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    for (const loc of getLocationsForWalk(w.slug)) {
      entries.push({
        url: `${BASE_URL}/walks/${w.slug}/lokasi/${loc.slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Cerita
  for (const c of getAllCerita()) {
    entries.push({
      url: `${BASE_URL}/cerita/${c.slug}/`,
      lastModified: new Date(c.publishedDate),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
