import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cerita Kota, Ruang, dan Masyarakat',
  description: 'Catatan lapangan dan cerita UrbanMorphSoc tentang bentuk kota, ruang, memori, dan kehidupan masyarakat.',
  alternates: { canonical: 'https://urbanmorphsoc.com/stories/' },
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
