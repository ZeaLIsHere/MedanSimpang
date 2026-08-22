import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cerita dan Liputan Kota Medan',
  description: 'Presentasi, video, catatan perjalanan, dan liputan kegiatan Medan Simpang dalam membaca Kota Medan dari level mata.',
  alternates: { canonical: 'https://urbanmorphsoc.com/medansimpang/cerita/' },
};

export default function CeritaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
