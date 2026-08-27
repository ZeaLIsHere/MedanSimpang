import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project, Riset, dan Pengabdian',
  description: 'Project UrbanMorphSoc tentang morfologi kota, warisan budaya, dan masyarakat: Medan Simpang, Raja Bilah, dan Medan Multi-Ethnic.',
  alternates: { canonical: 'https://urbanmorphsoc.com/projects/' },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
