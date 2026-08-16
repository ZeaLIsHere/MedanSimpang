'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { KawasanCard } from '@/components/ui/Card';
import { getAllKawasan } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Map, List } from 'lucide-react';

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
  // Mobile view mode: 'list' (default) or 'map'
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  const translations = {
    heroSubtitle: 'Seen at eye level',
    heroDescription: language === 'id'
      ? 'Medan Simpang mengajak Anda menjelajahi kota sebagai persimpangan budaya, etnis, dan kepercayaan — melalui ruang dan jalan di mana kehidupan urban terbentang nyata di depan mata.'
      : 'Medan Simpang invites you to explore the city as an intersection of cultures, ethnicities, and beliefs - through spaces and streets where urban life unfolds at eye level.',
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
      linkUrl: `/medansimpang/${k.slug}`,
      linkText: language === 'id' ? 'Jelajahi Kawasan' : 'Explore Neighbourhood',
    },
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main scrollable grid container */}
      <main className="flex-grow pt-28 sm:pt-32 pb-24 lg:pb-16">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Hero & Kawasan List */}
            <div className={`lg:col-span-5 xl:col-span-5 space-y-8 ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
              {/* Hero Section */}
              <div className="space-y-4 pt-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight leading-tight">
                  Medan <span className="text-primary-strong">Simpang</span>
                </h1>
                <p className="text-base sm:text-lg text-primary-strong font-bold tracking-wide">
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
            <div className={`lg:col-span-7 xl:col-span-7 lg:sticky lg:top-[100px] w-full rounded-2xl overflow-hidden shadow-md ${
              mobileView === 'map' ? 'block h-[calc(100vh-170px)]' : 'hidden lg:block h-[380px] sm:h-[450px] lg:h-[calc(100vh-140px)]'
            }`}>
              <MedanMap
                pins={mapPins}
                centerLat={3.5932}
                centerLng={98.6712}
                zoom={14.5}
                activePinId={activeKawasanSlug}
                onPinClick={(slug) => setActiveKawasanSlug(slug)}
                language={language}
              />
            </div>

          </div>
        </div>
      </main>

      {/* Floating Mobile View Switcher */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <div className="bg-accent/95 backdrop-blur-md text-white p-1 rounded-full shadow-2xl border border-white/20 flex items-center gap-1">
          <button
            onClick={() => setMobileView('list')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              mobileView === 'list' ? 'bg-primary text-accent shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            <span>{language === 'id' ? 'Daftar' : 'List'}</span>
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              mobileView === 'map' ? 'bg-primary text-accent shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>{language === 'id' ? 'Peta' : 'Map'}</span>
          </button>
        </div>
      </div>

      {/* Footer at the very bottom of the page */}
      <Footer />
    </div>
  );
}
