import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academy Medan Simpang',
  description: 'Aktivitas belajar interaktif Medan Simpang untuk mengenal kota, kawasan Silalas, dan warisan lokal.',
  alternates: { canonical: 'https://urbanmorphsoc.com/medansimpang/academy/' },
};

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
