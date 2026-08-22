'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { KawasanCard } from '@/components/ui/Card';
import { getAllKawasan } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Map, List } from 'lucide-react';
import useMediaQuery from '@/hooks/useMediaQuery';
import useConstrainedNetwork from '@/hooks/useConstrainedNetwork';
import DeferredMapNotice from '@/components/map/DeferredMapNotice';

// Dynamically import generic MedanMap component
const MedanMap = dynamic(() => import('@/components/map/MedanMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bone/35 text-accent/70">
      <MapPin className="mb-2 h-7 w-7 text-primary-strong" />
      <span className="text-sm font-semibold">Memuat peta…</span>
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
  const [mapRequested, setMapRequested] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isConstrainedNetwork = useConstrainedNetwork();
  const shouldRenderMap = mobileView === 'map' || (isDesktop && (!isConstrainedNetwork || mapRequested));

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
      <main className="grow pb-24 pt-26 sm:pt-28 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10">

            {/* Left Column: Hero & Kawasan List */}
            <div className={`min-w-0 space-y-7 ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
              {/* Hero Section */}
              <div className="space-y-4 pt-2">
                <h1 className="text-balance font-serif text-3xl font-black leading-tight tracking-[-0.025em] text-accent sm:text-4xl lg:text-5xl">
                  Medan <span className="text-primary-strong">Simpang</span>
                </h1>
                <p className="text-base sm:text-lg text-primary-strong font-bold tracking-wide">
                  {translations.heroSubtitle}
                </p>
                <p className="max-w-xl text-pretty text-sm font-medium leading-7 text-accent/85 sm:text-base">
                  {translations.heroDescription}
                </p>
              </div>

              {/* Kawasan list */}
              <div className="space-y-5 border-t border-bone/70 pt-6">
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
                <div className="grid grid-cols-1 gap-4">
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
            <div className={`min-w-0 w-full overflow-hidden rounded-xl bg-bone/35 lg:sticky lg:top-[104px] ${
              mobileView === 'map' ? 'block h-[calc(100dvh-154px)]' : 'hidden lg:block lg:h-[calc(100vh-124px)]'
            }`}>
              {shouldRenderMap ? (
                <MedanMap
                  pins={mapPins}
                  centerLat={3.5932}
                  centerLng={98.6712}
                  zoom={16}
                  activePinId={activeKawasanSlug}
                  onPinClick={(slug) => setActiveKawasanSlug(slug)}
                  language={language}
                />
              ) : (
                <DeferredMapNotice language={language} onLoad={() => setMapRequested(true)} />
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Floating Mobile View Switcher */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 lg:hidden">
        <div className="flex items-center gap-1 rounded-full bg-accent p-1 text-white shadow-md">
          <button
            onClick={() => setMobileView('list')}
            className={`flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              mobileView === 'list' ? 'bg-primary text-accent shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            <span>{language === 'id' ? 'Daftar' : 'List'}</span>
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={`flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
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
