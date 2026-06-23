'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Globe, Map, List, ArrowLeft, Clock, Navigation, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { WalkCard } from '@/components/ui/Card';
import { getKawasanBySlug, getWalksForKawasan } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';

// Dynamically import generic MedanMap component
const MedanMap = dynamic(() => import('@/components/map/MedanMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-bone/35 animate-pulse flex flex-col items-center justify-center text-text-muted border-l border-bone/60">
      <MapPin className="h-8 w-8 text-primary animate-bounce mb-2" />
      <span className="text-sm font-semibold tracking-wider">Memuat Peta Kawasan...</span>
    </div>
  ),
});

export default function KawasanDetail() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  
  const slug = params?.slug as string;
  const kawasan = getKawasanBySlug(slug);
  const walks = getWalksForKawasan(slug);

  // States for interactive map & mobile view
  const [activeWalkSlug, setActiveWalkSlug] = useState<string | undefined>(undefined);
  const [showMobileMap, setShowMobileMap] = useState<boolean>(false);

  if (!kawasan) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-accent">Kawasan Tidak Ditemukan</h2>
          <p className="mt-2 text-text-muted">Maaf, kawasan dengan slug "{slug}" belum terdaftar.</p>
          <Link href="/" className="mt-6 flex items-center text-primary font-bold hover:underline">
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
        linkUrl: `/walks/${walk.slug}`,
        linkText: language === 'id' ? 'Jelajahi Rute' : 'Explore Trail',
      },
    };
  });

  // Calculate center coordinates (first walk in list, fallback to Kesawan center)
  const centerLat = walks[0]?.latitude || 3.589882;
  const centerLng = walks[0]?.longitude || 98.677843;

  const translations = {
    showMap: language === 'id' ? 'Lihat Peta' : 'Show Map',
    showList: language === 'id' ? 'Lihat Daftar' : 'Show List',
    routesTitle: language === 'id' ? 'Pilih Rute Jalan Kaki' : 'Choose Walking Trail',
    walkCountText: language === 'id'
      ? `${walks.length} rute aktif`
      : `${walks.length} active trails`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main split-screen container */}
      <main className="flex-grow pt-20 flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden relative">
        
        {/* Left scrollable panel */}
        <div 
          className={`w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 scroll-smooth border-r border-bone/60 ${
            showMobileMap ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbsItems} />

          {/* Kawasan Header */}
          <div className="space-y-4 pt-2">
            <span className="inline-block rounded-md bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-xs font-bold text-primary uppercase tracking-wider">
              Kawasan / Neighbourhood
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-black text-accent tracking-tight leading-none">{name}</h1>
            <p className="text-base md:text-lg text-text-muted font-light leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Description & Switcher */}
          <div className="space-y-4 border-t border-bone/45 pt-6">
            <div className="flex items-center gap-3 bg-bone/35 border border-bone/70 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-text-muted shadow-sm w-fit">
              <Globe className="h-4 w-4 text-secondary" />
              <span>{language === 'id' ? 'Baca dalam:' : 'Read in:'}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-1.5 py-0.5 rounded ${
                    language === 'id' ? 'bg-primary text-accent font-bold' : 'hover:text-secondary'
                  }`}
                >
                  Indonesia
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 rounded ${
                    language === 'en' ? 'bg-primary text-accent font-bold' : 'hover:text-secondary'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

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
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider bg-bone/40 border border-bone/80 px-2.5 py-1 rounded-lg">
                {translations.walkCountText}
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
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

          <Footer />
        </div>

        {/* Right persistent map panel */}
        <div 
          className={`w-full lg:w-[55%] xl:w-[60%] h-full relative ${
            showMobileMap ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Generic MedanMap Component (Centered and Zoomed to this Kawasan) */}
          <MedanMap
            pins={mapPins}
            centerLat={centerLat}
            centerLng={centerLng}
            zoom={15.5} // slightly zoomed in closer to the district
            activePinId={activeWalkSlug}
            onPinClick={(slug) => setActiveWalkSlug(slug)}
            language={language}
          />
        </div>

        {/* Floating Mobile Toggle Button */}
        <button
          onClick={() => setShowMobileMap(!showMobileMap)}
          className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-accent text-white px-5 py-3 rounded-full shadow-lg border border-bone/20 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all"
        >
          {showMobileMap ? (
            <>
              <List className="w-4 h-4 text-primary" />
              <span>{translations.showList}</span>
            </>
          ) : (
            <>
              <Map className="w-4 h-4 text-primary" />
              <span>{translations.showMap}</span>
            </>
          )}
        </button>
      </main>
    </div>
  );
}
