import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Urban Morphology and Society',
  description: 'Profil, anggota, mahasiswa, dan jejaring kolaborasi klaster riset Urban Morphology and Society di Universitas Sumatera Utara.',
  alternates: { canonical: 'https://urbanmorphsoc.com/about/' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
