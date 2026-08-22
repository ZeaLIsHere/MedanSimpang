'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, MapPin, Map, List } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { WalkCard } from '@/components/ui/Card';
import { getKawasanBySlug, getWalksForKawasan } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';
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

export default function KawasanDetail({ slug }: { slug: string }) {
  const { language } = useLanguage();
  
  const kawasan = getKawasanBySlug(slug);
  const walks = getWalksForKawasan(slug);

  // States for interactive map
  const [activeWalkSlug, setActiveWalkSlug] = useState<string | undefined>(undefined);
  // Mobile view mode: 'list' (default) or 'map'
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [mapRequested, setMapRequested] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isConstrainedNetwork = useConstrainedNetwork();
  const shouldRenderMap = mobileView === 'map' || (isDesktop && (!isConstrainedNetwork || mapRequested));

  if (!kawasan) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow flex flex-col items-center justify-center pt-32 px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-accent">Kawasan Tidak Ditemukan</h2>
          <p className="mt-2 text-text-muted">Maaf, kawasan dengan slug &quot;{slug}&quot; belum terdaftar.</p>
          <Link href="/medansimpang" className="mt-6 flex items-center text-primary font-bold hover:underline">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Kembali ke Beranda
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const name = kawasan.name;
  const tagline = language === 'id' ? kawasan.tagline_id : kawasan.tagline_en;
  const description = language === 'id' ? kawasan.description_id : kawasan.description_en;

  const breadcrumbsItems = [
    { label: name },
  ];

  // Map walks data in this kawasan to MapPinData
  const mapPins = walks.map((walk) => {
    const wTitle = language === 'id' ? walk.title_id : walk.title_en;
    const wDescription = language === 'id' ? walk.description_id : walk.description_en;
    
    return {
      id: walk.slug,
      latitude: walk.latitude || 3.589882,
      longitude: walk.longitude || 98.677843,
      popupData: {
        title: wTitle,
        subtitle: wDescription.slice(0, 70) + '...',
        imageUrl: walk.heroImage,
        linkUrl: `/medansimpang/walks/${walk.slug}`,
        linkText: language === 'id' ? 'Jelajahi Rute' : 'Explore Trail',
      },
    };
  });

  // Calculate center coordinates (first walk in list, fallback to Kesawan center)
  const centerLat = walks[0]?.latitude || 3.589882;
  const centerLng = walks[0]?.longitude || 98.677843;

  // Route only shows for the trail the user is currently focusing, never all combined.
  const activeWalk = walks.find((w) => w.slug === activeWalkSlug);
  const activeRoutes = activeWalk?.route ? [{ coordinates: activeWalk.route }] : [];

  const translations = {
    routesTitle: language === 'id' ? 'Pilih Rute Jalan Kaki' : 'Choose Walking Trail',
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main scrollable grid container — same pattern as Homepage */}
      <main className="grow pb-24 pt-26 sm:pt-28 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
            
            {/* Left Column: Kawasan Info & Walks List (5/12) */}
            <div className={`min-w-0 space-y-7 ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
              {/* Breadcrumbs */}
              <Breadcrumbs items={breadcrumbsItems} />

              {/* Kawasan Header */}
              <div className="space-y-4 pt-2">
                <span className="inline-block rounded-md bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-xs font-bold text-primary uppercase tracking-wider">
                  Kawasan / Neighbourhood
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight leading-tight">{name}</h1>
                <p className="text-sm sm:text-base font-semibold text-accent/90 leading-relaxed max-w-md">
                  {tagline}
                </p>
              </div>

              {/* Description follows the global language selected in the header */}
              <div className="border-t border-bone/45 pt-6">
                <p className="text-sm md:text-base text-text-main font-light leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Walks listing */}
              <div className="border-t border-bone/45 pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold text-accent">
                    {translations.routesTitle}
                  </h2>
                </div>
                
                {/* List of walks - 2 columns on tablet/desktop */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {walks.map((walk) => (
                    <div 
                      key={walk.slug}
                      onMouseEnter={() => setActiveWalkSlug(walk.slug)}
                      onMouseLeave={() => setActiveWalkSlug(undefined)}
                    >
                      <WalkCard walk={walk} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Window Map (7/12) — same as Homepage */}
            <div className={`min-w-0 w-full overflow-hidden rounded-xl bg-bone/35 lg:sticky lg:top-[104px] ${
              mobileView === 'map' ? 'block h-[calc(100dvh-154px)]' : 'hidden lg:block lg:h-[calc(100vh-124px)]'
            }`}>
              {shouldRenderMap ? (
                <MedanMap
                  pins={mapPins}
                  routes={activeRoutes}
                  centerLat={centerLat}
                  centerLng={centerLng}
                  zoom={16.5}
                  activePinId={activeWalkSlug}
                  onPinClick={(slug) => setActiveWalkSlug(slug)}
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
