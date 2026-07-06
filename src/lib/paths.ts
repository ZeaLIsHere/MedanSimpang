// Base path aplikasi (mis. "/medansimpang" saat jadi sub-path urbanmorphsoc.com).
// Sumber tunggal: env NEXT_PUBLIC_BASE_PATH yang diset di next.config.ts.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Prefiks path aset LOKAL dengan basePath.
 * Dipakai HANYA untuk path mentah yang tidak lewat next/image atau next/Link
 * (mis. <img src> di popup Leaflet, <a href> unduhan file). URL eksternal
 * (http/https) & anchor (#) dibiarkan apa adanya.
 */
export function assetPath(p?: string): string {
  if (!p) return p ?? '';
  if (/^(https?:)?\/\//.test(p) || p.startsWith('#') || p.startsWith('data:')) return p;
  const clean = p.startsWith('/') ? p : `/${p}`;
  return `${BASE_PATH}${clean}`;
}
