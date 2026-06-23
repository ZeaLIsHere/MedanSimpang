'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { WalkCard } from '@/components/ui/Card';
import { getAllWalks } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';
import { Map, List, Compass, Navigation, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

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
  const walks = getAllWalks();
  
  // States for interactive map
  const [activeWalkSlug, setActiveWalkSlug] = useState<string | undefined>(undefined);

  const translations = {
    heroTitle: 'Medan Simpang',
    heroSubtitle: 'Seen at eye level',
    heroDescription: language === 'id'
      ? 'Medan Simpang membawa Anda menyusuri sejarah, kuliner, dan budaya tersembunyi di balik gang-gang kecil (simpang) dan fasad tua kota Medan.'
      : 'Medan Simpang leads you through history, culinary delights, and hidden cultures behind the narrow alleys (simpang) and historic facades of Medan.',
  };

  // Map walks data to generic MedanMap MapPinData format
  const mapPins = walks.map((walk) => {
    const title = language === 'id' ? walk.title_id : walk.title_en;
    const description = language === 'id' ? walk.description_id : walk.description_en;
    
    return {
      id: walk.slug,
      latitude: walk.latitude || 3.589882,
      longitude: walk.longitude || 98.677843,
      popupData: {
        title: title,
        subtitle: description.slice(0, 70) + '...',
        imageUrl: walk.heroImage,
        linkUrl: `/walks/${walk.slug}`,
        linkText: language === 'id' ? 'Jelajahi Rute' : 'Explore Trail',
      },
    };
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main scrollable grid container */}
      <main className="flex-grow pt-24 pb-16">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Hero & Walks List */}
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

              {/* Walks guide list */}
              <div className="border-t border-bone/45 pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold text-accent">
                    {language === 'id' ? 'Daftar Rute' : 'Trails Guide'}
                  </h2>
                </div>

                {/* List of walks - 2 columns on tablet/desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

            {/* Right Column: Sticky Window Map */}
            <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-[100px] w-full h-[380px] sm:h-[450px] lg:h-[calc(100vh-140px)] rounded-2xl overflow-hidden shadow-md">
              {/* Generic MedanMap Component as a Window */}
              <MedanMap
                pins={mapPins}
                centerLat={3.589882} // Kesawan center
                centerLng={98.677843}
                zoom={15}
                activePinId={activeWalkSlug}
                onPinClick={(slug) => setActiveWalkSlug(slug)}
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
