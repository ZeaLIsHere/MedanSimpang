import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cerita, Penelitian, dan Publikasi UrbanMorphSoc',
  description: 'Jejak penelitian, publikasi ilmiah, dan kolaborasi Urban Morphology and Society tentang morfologi kota dan kehidupan masyarakat.',
  alternates: { canonical: 'https://urbanmorphsoc.com/stories/' },
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
