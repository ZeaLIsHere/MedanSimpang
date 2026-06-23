'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { KawasanCard } from '@/components/ui/Card';
import { getAllKawasan } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin } from 'lucide-react';

// Dynamically import generic MedanMap component
const MedanMap = dynamic(() => import('@/components/map/MedanMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-bone/35 animate-pulse flex flex-col items-center justify-center text-text-muted border-l border-bone/60">
      <MapPin className="h-8 w-8 text-primary animate-bounce mb-2" />
      <span className="text-sm font-semibold tracking-wider">Memuat Peta Overview...</span>
    </div>
  ),
});

export default function Home() {
  const { language } = useLanguage();
  const kawasanList = getAllKawasan();

  // Active kawasan for map highlight (hover sync)
  const [activeKawasanSlug, setActiveKawasanSlug] = useState<string | undefined>(undefined);

  const translations = {
    heroSubtitle: 'Seen at eye level',
    heroDescription: language === 'id'
      ? 'Medan Simpang membawa Anda menyusuri sejarah, kuliner, dan budaya tersembunyi di balik gang-gang kecil (simpang) dan fasad tua kota Medan.'
      : 'Medan Simpang leads you through history, culinary delights, and hidden cultures behind the narrow alleys (simpang) and historic facades of Medan.',
  };

  // Map kawasan data to generic MedanMap MapPinData format (one pin per kawasan)
  const mapPins = kawasanList.map((k) => ({
    id: k.slug,
    latitude: k.latitude ?? 3.6005,
    longitude: k.longitude ?? 98.6706,
    popupData: {
      title: k.name,
      subtitle: language === 'id' ? k.tagline_id : k.tagline_en,
      imageUrl: k.coverImage,
      linkUrl: `/kawasan/${k.slug}`,
      linkText: language === 'id' ? 'Jelajahi Kawasan' : 'Explore Neighbourhood',
    },
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main scrollable grid container */}
      <main className="flex-grow pt-24 pb-16">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Hero & Kawasan List */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-8">
              {/* Hero Section */}
              <div className="space-y-4 pt-2">
                <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent tracking-tight leading-none">
                  MEDAN <span className="text-primary">SIMPANG</span>
                </h1>
                <p className="text-lg text-primary font-bold tracking-wide uppercase">
                  {translations.heroSubtitle}
                </p>
                <p className="text-sm sm:text-base font-semibold text-accent/90 leading-relaxed max-w-md">
                  {translations.heroDescription}
                </p>
              </div>

              {/* Kawasan list */}
              <div className="border-t border-bone/45 pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold text-accent">
                    {language === 'id' ? 'Jelajah Kawasan' : 'Explore Neighbourhood'}
                  </h2>
                </div>
                <p className="text-sm text-text-muted font-light leading-relaxed -mt-2">
                  {language === 'id'
                    ? 'Pilih kawasan untuk melihat rute-rute jalan kaki di dalamnya.'
                    : 'Choose a neighbourhood to see the walking trails inside it.'}
                </p>

                {/* List of kawasan */}
                <div className="grid grid-cols-1 gap-6">
                  {kawasanList.map((k) => (
                    <div
                      key={k.slug}
                      onMouseEnter={() => setActiveKawasanSlug(k.slug)}
                      onMouseLeave={() => setActiveKawasanSlug(undefined)}
                    >
                      <KawasanCard kawasan={k} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Window Map */}
            <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-[100px] w-full h-[380px] sm:h-[450px] lg:h-[calc(100vh-140px)] rounded-2xl overflow-hidden shadow-md">
              {/* Generic MedanMap Component as a Window */}
              <MedanMap
                pins={mapPins}
                centerLat={3.6005} // Silalas / Deli Riverside center
                centerLng={98.6706}
                zoom={14.5}
                activePinId={activeKawasanSlug}
                onPinClick={(slug) => setActiveKawasanSlug(slug)}
                language={language}
              />
            </div>

          </div>
        </div>
      </main>

      {/* Footer at the very bottom of the page */}
      <Footer />
    </div>
  );
}
