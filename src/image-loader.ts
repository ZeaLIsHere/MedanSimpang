// Custom image loader untuk next/image saat static export + basePath.
// next/image dgn unoptimized TIDAK menambah basePath ke src lokal, sehingga
// gambar 404 saat aplikasi dilayani di sub-path (mis. /medansimpang).
// Loader ini menambah basePath tanpa mengoptimasi ulang (URL apa adanya).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  if (src.startsWith('data:')) return src;

  if (/^https?:\/\//.test(src)) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    if (quality) url.searchParams.set('q', String(quality));
    return url.toString();
  }

  if (src.startsWith('//')) {
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}w=${width}${quality ? `&q=${quality}` : ''}`;
  }

  const clean = src.startsWith('/') ? src : `/${src}`;
  return `${BASE_PATH}${clean}?w=${width}${quality ? `&q=${quality}` : ''}`;
}
