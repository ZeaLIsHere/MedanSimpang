// Custom image loader untuk next/image saat static export + basePath.
// next/image dgn unoptimized TIDAK menambah basePath ke src lokal, sehingga
// gambar 404 saat aplikasi dilayani di sub-path (mis. /medansimpang).
// Loader ini menambah basePath tanpa mengoptimasi ulang (URL apa adanya).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src; // eksternal / data URI
  const clean = src.startsWith('/') ? src : `/${src}`;
  return `${BASE_PATH}${clean}`;
}
