'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, BookOpen, Navigation, Pencil, Share2 } from 'lucide-react';

export default function MetodologiPage() {
  const { language } = useLanguage();

  const breadcrumbsItems = [
    { label: language === 'id' ? 'Tentang' : 'About' },
    { label: language === 'id' ? 'Metodologi' : 'Methodology' },
  ];

  const steps = [
    {
      num: '01',
      icon: <BookOpen className="w-5 h-5" />,
      title: language === 'id' ? 'Riset Arsip & Sejarah' : 'Archive & Historical Research',
      desc: language === 'id'
        ? 'Riset kami dimulai dari membedah arsip koran tua Deli, peta kolonial, dan buku-buku sejarah untuk menyaring data awal mengenai bangunan cagar budaya di kawasan target.'
        : 'Our research begins by analyzing old Deli newspapers, colonial cartography, and historical volumes to compile facts on the target district\'s heritage buildings.',
    },
    {
      num: '02',
      icon: <Compass className="w-5 h-5" />,
      title: language === 'id' ? 'Wawancara Lapangan' : 'Field Oral Histories',
      desc: language === 'id'
        ? 'Kami mendatangi langsung lokasi dan mewawancarai pedagang legendaris, keturunan tokoh lokal, serta warga setempat untuk melengkapi sejarah formal dengan ingatan kolektif masyarakat.'
        : 'We interview legendary local merchants, descendants of historical figures, and long-time residents on site to enrich formal history with collective citizen memories.',
    },
    {
      num: '03',
      icon: <Navigation className="w-5 h-5" />,
      title: language === 'id' ? 'Audit Aksesibilitas Pejalan Kaki' : 'Pedestrian Audit',
      desc: language === 'id'
        ? 'Kami menguji rute jalan kaki secara fisik beberapa kali untuk mengukur durasi, kenyamanan trotoar, keamanan gang, dan kesesuaian akses navigasi GPS.'
        : 'We field-test the trails multiple times to audit the walk duration, sidewalk quality, safety, and GPS coordinates mapping accuracy.',
    },
    {
      num: '04',
      icon: <Pencil className="w-5 h-5" />,
      title: language === 'id' ? 'Ilustrasi & Desain Peta' : 'Cartographic Design',
      desc: language === 'id'
        ? 'Tim desainer kami menggambar peta ilustrasi ikonik secara manual yang ramah dibaca dan menyederhanakan rute rumit menjadi panduan visual yang menarik.'
        : 'Our designers illustrate trail maps by hand to deliver highly engaging visual maps that simplify navigation and invite exploration.',
    },
    {
      num: '05',
      icon: <Share2 className="w-5 h-5" />,
      title: language === 'id' ? 'Publikasi & Pembaruan Rutin' : 'Publishing & Updates',
      desc: language === 'id'
        ? 'Rute dipublikasikan secara digital dan fisik. Kami memperbarui informasi secara berkala mengikuti perubahan jam buka toko, kondisi jalanan, atau penemuan arsip baru.'
        : 'The paths are published online and physically. We constantly update listing metadata based on opening hours changes, path repairs, or new historical finds.',
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

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <span className="inline-flex items-center gap-1 bg-secondary/15 px-3 py-1 rounded-full text-xs font-bold text-secondary uppercase tracking-wider">
              Method
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent">
              {language === 'id' ? 'Metodologi Pembuatan Rute' : 'Trail Curation Methodology'}
            </h1>
            <p className="text-base sm:text-lg text-text-muted font-light max-w-2xl mx-auto leading-relaxed">
              {language === 'id'
                ? 'Bagaimana kami merumuskan rute jalan kaki mandiri Medan Simpang agar akurat secara historis, aman dijelajahi, dan berdampak sosial-ekonomi.'
                : 'How we build the Medan Simpang walking trails to be historically accurate, pedestrian-safe, and socially impactful.'}
            </p>
          </div>

          {/* Steps list */}
          <div className="space-y-6">
            {steps.map((s, index) => (
              <div
                key={index}
                className="flex gap-6 bg-white border border-bone/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 text-accent flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  {s.num}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-secondary">
                    {s.icon}
                    <h3 className="font-serif text-lg font-bold text-accent">{s.title}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-text-muted font-light leading-relaxed">
                    {s.desc}
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
