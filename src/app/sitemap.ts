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
  // Tanggal konten nyata lebih dapat dipercaya crawler daripada waktu build
  // yang berubah setiap kali situs diekspor ulang.
  const contentUpdatedAt = new Date('2026-08-22');

  // Static routes
  const staticPaths = [
    '',
    '/academy',
    '/cerita',
    '/tentang/visi',
    '/tentang/sejarah',
    '/tentang/komunitas',
    '/tentang/tim',
    '/tentang/metodologi',
  ];

  const entries: MetadataRoute.Sitemap = [
    {
      url: 'https://urbanmorphsoc.com/',
      lastModified: contentUpdatedAt,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://urbanmorphsoc.com/projects/',
      lastModified: contentUpdatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://urbanmorphsoc.com/stories/',
      lastModified: contentUpdatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://urbanmorphsoc.com/about/',
      lastModified: contentUpdatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...staticPaths.map((p) => ({
      url: `${BASE_URL}${p}/`,
      lastModified: contentUpdatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // Kawasan
  for (const k of getAllKawasan()) {
    entries.push({
      url: `${BASE_URL}/${k.slug}/`,
      lastModified: contentUpdatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Walks + their locations
  for (const w of getAllWalks()) {
    entries.push({
      url: `${BASE_URL}/walks/${w.slug}/`,
      lastModified: contentUpdatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    for (const loc of getLocationsForWalk(w.slug)) {
      entries.push({
        url: `${BASE_URL}/walks/${w.slug}/lokasi/${loc.slug}/`,
        lastModified: contentUpdatedAt,
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
