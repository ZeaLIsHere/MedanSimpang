import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project dan Riset Kota',
  description: 'Project dan inisiatif UrbanMorphSoc tentang morfologi kota dan masyarakat, termasuk Medan Simpang.',
  alternates: { canonical: 'https://urbanmorphsoc.com/projects/' },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
