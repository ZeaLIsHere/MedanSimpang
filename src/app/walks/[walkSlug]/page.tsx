'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Navigation, MapPin, Globe, Download, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Badge from '@/components/ui/Badge';
import { getWalkBySlug, getKawasanBySlug, getLocationsForWalk, getWalksForKawasan } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';
import { CategoryType } from '@/types';

// Dynamically import map client-side to prevent SSR window reference error
const MedanMap = dynamic(() => import('@/components/map/MedanMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] md:h-[450px] w-full bg-bone/35 animate-pulse rounded-2xl flex flex-col items-center justify-center text-text-muted border border-bone/60">
      <MapPin className="h-8 w-8 text-primary animate-bounce mb-2" />
      <span className="text-sm font-semibold tracking-wider">Memuat Peta Interaktif...</span>
    </div>
  ),
});

export default function WalkDetail() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'All'>('All');
  const [activeLocationSlug, setActiveLocationSlug] = useState<string | undefined>(undefined);

  const walkSlug = params?.walkSlug as string;
  const walk = getWalkBySlug(walkSlug);

  if (!walk) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-accent">Rute Tidak Ditemukan</h2>
          <p className="mt-2 text-text-muted">Maaf, rute jalan kaki dengan slug "{walkSlug}" belum terdaftar.</p>
          <Link href="/" className="mt-6 flex items-center text-primary font-bold hover:underline">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Kembali ke Beranda
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const kawasan = getKawasanBySlug(walk.neighbourhoodSlug);
  const locations = getLocationsForWalk(walkSlug);
  const allWalksInKawasan = getWalksForKawasan(walk.neighbourhoodSlug);
  const nearbyWalks = allWalksInKawasan.filter((w) => w.slug !== walkSlug);

  const title = language === 'id' ? walk.title_id : walk.title_en;
  const description = language === 'id' ? walk.description_id : walk.description_en;
  const durationText = language === 'id'
    ? `${walk.durationMinutes >= 60 ? `${(walk.durationMinutes / 60).toFixed(1)} jam` : `${walk.durationMinutes} menit`}`
    : `${walk.durationMinutes >= 60 ? `${(walk.durationMinutes / 60).toFixed(1)} hrs` : `${walk.durationMinutes} mins`}`;

  const distanceKm = (walk.distanceMeters / 1000).toFixed(1);
  const distanceText = language === 'id'
    ? `${distanceKm} km (${walk.stepsCount} langkah)`
    : `${distanceKm} km (${walk.stepsCount} steps)`;

  const breadcrumbsItems = [
    { label: kawasan?.name || 'Kawasan', path: `/kawasan/${walk.neighbourhoodSlug}` },
    { label: title },
  ];

  // Count items per category
  const getCategoryCount = (cat: CategoryType | 'All') => {
    if (cat === 'All') return locations.length;
    return locations.filter((loc) => loc.category === cat).length;
  };

  const filteredLocations = activeCategory === 'All'
    ? locations
    : locations.filter((loc) => loc.category === activeCategory);

  const filterChips: { key: CategoryType | 'All'; label: string; color: string }[] = [
    { key: 'All', label: language === 'id' ? 'Semua' : 'All', color: 'bg-accent text-white border-accent' },
    { key: 'iSee', label: language === 'id' ? 'Situs' : 'Sites', color: 'bg-isee text-white border-isee' },
    { key: 'iEat', label: language === 'id' ? 'Kuliner' : 'Eats', color: 'bg-ieat text-white border-ieat' },
    { key: 'iDrink', label: language === 'id' ? 'Minuman' : 'Drinks', color: 'bg-idrink text-white border-idrink' },
    { key: 'iSurprise', label: language === 'id' ? 'Unik' : 'Surprises', color: 'bg-isurprise text-white border-isurprise' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Breadcrumbs */}
        <div className="bg-bone/30 border-b border-bone/40 py-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbsItems} />
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden bg-accent">
          <Image
            src={walk.heroImage}
            alt={title}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 py-8 md:py-12 z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
              <span className="inline-block rounded-md bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                {walk.walkType}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl">
                {title}
              </h1>
              <p className="mt-2 text-xs md:text-sm text-gray-300 font-light">
                {language === 'id' ? 'Kredit Kawasan: ' : 'District: '}
                <Link href={`/kawasan/${walk.neighbourhoodSlug}`} className="underline font-bold text-white hover:text-primary">
                  {kawasan?.name}
                </Link>
                {` • `}
                {language === 'id' ? 'Terakhir diperbarui: ' : 'Last updated: '} {walk.lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Info Strip */}
        <section className="bg-white border-b border-bone/40 shadow-sm py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-bone/50">
              <div className="flex flex-col justify-center items-center md:items-start py-2 md:py-0 md:px-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  {language === 'id' ? 'Durasi Rute' : 'Walk Duration'}
                </span>
                <span className="text-lg font-bold text-accent">{durationText}</span>
              </div>
              
              <div className="flex flex-col justify-center items-center md:items-start py-2 md:py-0 md:px-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-secondary" />
                  {language === 'id' ? 'Jarak Tempuh' : 'Walk Distance'}
                </span>
                <span className="text-lg font-bold text-accent">{distanceText}</span>
              </div>

              <div className="flex flex-col justify-center items-center md:items-start py-2 md:py-0 md:px-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  {language === 'id' ? 'Titik Singgah' : 'Points of Interest'}
                </span>
                <span className="text-lg font-bold text-accent">{walk.pointsOfInterestCount} POI</span>
              </div>

              <div className="flex flex-col justify-center items-center md:items-start py-2 md:py-0 md:px-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-secondary" />
                  {language === 'id' ? 'Bahasa Rute' : 'Languages'}
                </span>
                <span className="text-lg font-bold text-accent">ID / EN</span>
              </div>
            </div>
          </div>
        </section>

        {/* Description & Map Layout */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bilingual Switcher */}
              <div className="inline-flex items-center gap-3 bg-bone/45 border border-bone/80 px-4 py-2 rounded-xl text-xs font-medium text-text-muted">
                <Globe className="h-4 w-4 text-secondary" />
                <span>{language === 'id' ? 'Baca rute dalam:' : 'Read walk in:'}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('id')}
                    className={`px-2 py-0.5 rounded ${
                      language === 'id'
                        ? 'bg-primary text-accent font-bold'
                        : 'hover:text-secondary'
                    }`}
                  >
                    Indonesia
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-0.5 rounded ${
                      language === 'en'
                        ? 'bg-primary text-accent font-bold'
                        : 'hover:text-secondary'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Walk Description */}
              <p className="text-base md:text-lg text-text-main font-light leading-relaxed">
                {description}
              </p>

              {/* Map Filter & Interactive Map Section */}
              <div className="space-y-4 pt-4">
                <h3 className="font-serif text-2xl font-bold text-accent">
                  {language === 'id' ? 'Peta Interaktif Rute' : 'Interactive Trail Map'}
                </h3>
                
                {/* Custom Category Filter Chips */}
                <div className="flex flex-wrap gap-2 pb-2">
                  {filterChips.map((chip) => {
                    const count = getCategoryCount(chip.key);
                    const isActive = activeCategory === chip.key;
                    
                    return (
                      <button
                        key={chip.key}
                        onClick={() => setActiveCategory(chip.key)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                          isActive
                            ? `${chip.color} shadow-sm scale-103`
                            : 'border-bone bg-white text-text-muted hover:border-gray-400'
                        }`}
                      >
                        {chip.label} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Map Display */}
                <div className="h-[350px] md:h-[450px] w-full">
                  {(() => {
                    const pins = filteredLocations.map((loc) => ({
                      id: loc.slug,
                      latitude: loc.latitude,
                      longitude: loc.longitude,
                      order: loc.order,
                      category: loc.category,
                      popupData: {
                        title: language === 'id' ? loc.name_id : loc.name_en,
                        subtitle: language === 'id' ? loc.shortDescription_id : loc.shortDescription_en,
                        imageUrl: loc.thumbnail,
                        linkUrl: `/walks/${walkSlug}/lokasi/${loc.slug}`,
                        linkText: language === 'id' ? 'Detail Lokasi' : 'Explore Stop',
                      },
                    }));
                    return (
                      <MedanMap
                        pins={pins}
                        language={language}
                        centerLat={walk.latitude || 3.589882}
                        centerLng={walk.longitude || 98.677843}
                        zoom={15}
                        activePinId={activeLocationSlug}
                        onPinClick={(slug) => setActiveLocationSlug(slug)}
                      />
                    );
                  })()}
                </div>
              </div>

              {/* List of Locations (Synced with Active Filters) */}
              <div className="space-y-6 pt-8">
                <h3 className="font-serif text-2xl font-bold text-accent">
                  {language === 'id' ? 'Urutan Titik Singgah' : 'List of Stops'}
                </h3>
                
                <div className="space-y-4">
                  {filteredLocations.map((loc) => {
                    const name = language === 'id' ? loc.name_id : loc.name_en;
                    const subtitle = language === 'id' ? loc.shortDescription_id : loc.shortDescription_en;
                    const isHovered = activeLocationSlug === loc.slug;
                    
                    return (
                      <div
                        key={loc.slug}
                        onMouseEnter={() => setActiveLocationSlug(loc.slug)}
                        onMouseLeave={() => setActiveLocationSlug(undefined)}
                        className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-xl border transition-all duration-300 ${
                          isHovered
                            ? 'border-secondary/70 ring-2 ring-secondary/15 shadow-md scale-[1.01]'
                            : 'border-bone/60 shadow-sm'
                        }`}
                      >
                        {/* Circle Stop Number and Mini Image */}
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                            isHovered ? 'bg-secondary text-white' : 'bg-accent text-white'
                          }`}>
                            {loc.order}
                          </div>
                          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-bone flex-shrink-0 border-2 border-bone">
                            <Image
                               src={loc.thumbnail}
                               alt={name}
                               fill
                               className="object-cover"
                               sizes="56px"
                            />
                          </div>
                        </div>

                        {/* Location Details */}
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className={`font-serif font-bold text-base md:text-lg transition-colors duration-300 ${
                              isHovered ? 'text-secondary' : 'text-accent'
                            }`}>
                              {name}
                            </h4>
                            <Badge category={loc.category} lang={language} />
                          </div>
                          <p className="text-xs md:text-sm text-text-muted font-light leading-relaxed">
                            {subtitle}
                          </p>
                        </div>

                        {/* Detail Link button */}
                        <Link
                          href={`/walks/${walkSlug}/lokasi/${loc.slug}`}
                          className={`w-full sm:w-auto text-center px-4 py-2 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider ${
                            isHovered 
                              ? 'bg-secondary text-white border border-secondary'
                              : 'bg-bone/40 border border-bone/70 text-accent hover:bg-secondary hover:text-white'
                          }`}
                        >
                          {language === 'id' ? 'Detail Lokasi' : 'Explore Stop'} &rarr;
                        </Link>
                      </div>
                    );
                  })}
                  {filteredLocations.length === 0 && (
                    <div className="text-center py-10 bg-bone/10 rounded-xl border border-dashed border-bone">
                      <p className="text-text-muted text-sm font-light">
                        {language === 'id' ? 'Tidak ada lokasi dalam kategori ini.' : 'No locations found in this category.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div className="space-y-8">
              {/* Download Map Card */}
              <div className="bg-white rounded-2xl border border-bone/60 shadow-sm p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-accent">
                  {language === 'id' ? 'Unduh Peta Offline' : 'Download Offline Map'}
                </h3>
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-bone border border-bone/50 shadow-inner">
                  <Image
                    src={walk.downloadableMapImage}
                    alt="Map illustration preview"
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <p className="text-xs text-text-muted font-light leading-relaxed">
                  {language === 'id'
                    ? 'Bawa peta ilustrasi indah kami saat menjelajah tanpa koneksi internet.'
                    : 'Take our beautifully illustrated map with you, readable offline.'}
                </p>
                <a
                  href={walk.downloadableMapImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-lg bg-primary hover:bg-primary/95 text-accent font-bold py-2.5 text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  {language === 'id' ? 'Unduh PDF / Gambar' : 'Download PDF / JPG'}
                </a>
              </div>

              {/* Contributor Section */}
              <div className="bg-bone/25 rounded-2xl border border-bone/50 p-6 space-y-6">
                <h3 className="font-serif text-lg font-bold text-accent">
                  {language === 'id' ? 'Kredit & Kontributor' : 'Credits & Contributors'}
                </h3>
                
                <div className="space-y-4">
                  {walk.contributors.map((contrib, idx) => {
                    const bio = language === 'id' ? contrib.bio_id : contrib.bio_en;
                    return (
                      <div key={idx} className="space-y-3 pb-4 border-b border-bone/40 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-bone shadow-sm flex-shrink-0">
                            <Image
                              src={contrib.logoOrPhoto}
                              alt={contrib.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-accent leading-tight">{contrib.name}</h4>
                            <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">{contrib.type}</span>
                          </div>
                        </div>
                        <p className="text-xs text-text-muted font-light leading-relaxed">
                          {bio}
                        </p>
                        {contrib.linkUrl && (
                          <a
                            href={contrib.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-bold text-secondary hover:underline"
                          >
                            Kunjungi Tautan &rarr;
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Nearby Walks (Cross-linking within same kawasan) */}
              {nearbyWalks.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-accent">
                    {language === 'id' ? 'Rute Terdekat Lainnya' : 'Other Nearby Trails'}
                  </h3>
                  
                  <div className="space-y-3">
                    {nearbyWalks.map((nWalk) => {
                      const nTitle = language === 'id' ? nWalk.title_id : nWalk.title_en;
                      const nDuration = language === 'id'
                        ? `${nWalk.durationMinutes} menit`
                        : `${nWalk.durationMinutes} mins`;
                        
                      return (
                        <Link
                          key={nWalk.slug}
                          href={`/walks/${nWalk.slug}`}
                          className="group block p-3 rounded-xl border border-bone/50 hover:border-secondary/40 bg-white transition-colors"
                        >
                          <h4 className="font-serif font-bold text-accent group-hover:text-secondary transition-colors text-sm line-clamp-1">
                            {nTitle}
                          </h4>
                          <p className="text-[11px] text-text-muted font-light mt-1">
                            {nWalk.walkType} • {nDuration} • {nWalk.pointsOfInterestCount} POI
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
