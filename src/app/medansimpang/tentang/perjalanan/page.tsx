'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, Calendar } from 'lucide-react';

export default function PerjalananPage() {
  const { language } = useLanguage();

  const breadcrumbsItems = [
    { label: language === 'id' ? 'Tentang' : 'About' },
    { label: language === 'id' ? 'Perjalanan Kami' : 'Our Journey' },
  ];

  const milestones = [
    {
      year: '2024',
      title: language === 'id' ? 'Gagasan Awal' : 'The Conception',
      desc: language === 'id'
        ? 'Ide Medan Simpang lahir dari kegelisahan beberapa arsitek lokal saat berjalan menyusuri reruntuhan cagar budaya Gedung Warenhuis yang terbengkalai. Kami menyadari bahwa sejarah kota ini harus didokumentasikan dan disebarluaskan dengan cara baru.'
        : 'The idea for Medan Simpang was sparked during a walking tour by local architects around the ruins of the abandoned Warenhuis heritage building. We realized the city\'s history needed to be documented in a fresh way.',
    },
    {
      year: '2025',
      title: language === 'id' ? 'Riset & Wawancara Tetua' : 'Research & Oral Histories',
      desc: language === 'id'
        ? 'Kami menghabiskan satu tahun penuh mengumpulkan dokumen arsip dari Sumatera Post kuno, melakukan wawancara mendalam dengan pemilik kedai generasi ketiga di Kesawan, serta memvalidasi rute geografis agar aman bagi pejalan kaki.'
        : 'We spent an entire year gathering archives from old Sumatra Post editions, conducting oral history interviews with third-generation shop owners in Kesawan, and field-testing the paths for pedestrian safety.',
    },
    {
      year: '2026',
      title: language === 'id' ? 'Peluncuran Platform' : 'Platform Launch',
      desc: language === 'id'
        ? 'Meluncurkan platform digital Medan Simpang dengan rute pertama: "Jelajah Pusaka Kesawan" dan "Cita Rasa Kesawan", berkolaborasi dengan komunitas sejarah dan UMKM lokal legendaris.'
        : 'Launching the Medan Simpang digital platform featuring our inaugural paths: "Kesawan Heritage Trail" and "Classic Tastes of Kesawan", in partnership with heritage and local groups.',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="bg-bone/30 border-b border-bone/40 py-3 mb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbsItems} />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <span className="inline-flex items-center gap-1 bg-secondary/15 px-3 py-1 rounded-full text-xs font-bold text-secondary uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              History
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent">
              {language === 'id' ? 'Perjalanan Kami' : 'Our Journey'}
            </h1>
            <p className="text-base sm:text-lg text-text-muted font-light max-w-2xl mx-auto leading-relaxed">
              {language === 'id'
                ? 'Bagaimana sebuah mimpi kecil untuk mendokumentasikan ruko-ruko tua Kesawan berkembang menjadi gerakan city-walk mandiri di Kota Medan.'
                : 'How a small dream to document the old shophouses of Kesawan grew into a community-led self-guided walking movement in Medan.'}
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l-2 border-primary/40 pl-6 sm:pl-8 space-y-12 ml-4">
            {milestones.map((m, index) => (
              <div key={index} className="relative group">
                {/* Bullet */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Calendar className="w-2.5 h-2.5 text-secondary" />
                </div>
                
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary text-white font-bold text-xs uppercase tracking-wider">
                    {m.year}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-accent">
                    {m.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-muted font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
