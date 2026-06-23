'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Navigation, MapPin, Globe, Download, ArrowLeft } from 'lucide-react';
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
    <div className="h-full w-full bg-bone/35 animate-pulse flex flex-col items-center justify-center text-text-muted border-l border-bone/60">
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
          <p className="mt-2 text-text-muted">Maaf, rute jalan kaki dengan slug &quot;{walkSlug}&quot; belum terdaftar.</p>
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
    ? `${distanceKm} km`
    : `${distanceKm} km`;

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

  // Build map pins from filtered locations
  const mapPins = filteredLocations.map((loc) => ({
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main scrollable grid container — same pattern as Homepage */}
      <main className="flex-grow pt-24 pb-16">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Walk Content (5/12) */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-8">
              {/* Breadcrumbs */}
              <Breadcrumbs items={breadcrumbsItems} />

              {/* Walk Header */}
              <div className="space-y-4 pt-2">
                <span className="inline-block rounded-md bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-xs font-bold text-primary uppercase tracking-wider">
                  {walk.walkType}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="text-xs text-text-muted font-light">
                  {language === 'id' ? 'Kawasan: ' : 'District: '}
                  <Link href={`/kawasan/${walk.neighbourhoodSlug}`} className="underline font-bold text-secondary hover:text-primary">
                    {kawasan?.name}
                  </Link>
                  {` • `}
                  {language === 'id' ? 'Terakhir diperbarui: ' : 'Last updated: '} {walk.lastUpdated}
                </p>
              </div>

              {/* Info Strip (compact horizontal) */}
              <div className="flex flex-wrap items-center gap-4 bg-white border border-bone/50 rounded-xl px-4 py-3 shadow-sm text-center">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-bold text-accent">{durationText}</span>
                </div>
                <div className="w-px h-5 bg-bone/60" />
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-bold text-accent">{distanceText}</span>
                </div>
                <div className="w-px h-5 bg-bone/60" />
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-bold text-accent">{walk.pointsOfInterestCount} POI</span>
                </div>
                <div className="w-px h-5 bg-bone/60" />
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-bold text-accent">ID / EN</span>
                </div>
              </div>

              {/* Bilingual Switcher & Description */}
              <div className="space-y-4 border-t border-bone/45 pt-6">
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

                <p className="text-sm md:text-base text-text-main font-light leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="space-y-4 border-t border-bone/45 pt-6">
                <h3 className="font-serif text-xl font-bold text-accent">
                  {language === 'id' ? 'Filter Kategori' : 'Category Filter'}
                </h3>
                <div className="flex flex-wrap gap-2">
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
              </div>

              {/* List of Locations (Synced with Active Filters & Map) */}
              <div className="space-y-6 border-t border-bone/45 pt-6">
                <h3 className="font-serif text-xl font-bold text-accent">
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
                            <h4 className={`font-serif font-bold text-sm md:text-base transition-colors duration-300 ${
                              isHovered ? 'text-secondary' : 'text-accent'
                            }`}>
                              {name}
                            </h4>
                            <Badge category={loc.category} lang={language} />
                          </div>
                          <p className="text-xs text-text-muted font-light leading-relaxed">
                            {subtitle}
                          </p>
                        </div>

                        {/* Detail Link button */}
                        <Link
                          href={`/walks/${walkSlug}/lokasi/${loc.slug}`}
                          className={`w-full sm:w-auto text-center px-3 py-2 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider ${
                            isHovered 
                              ? 'bg-secondary text-white border border-secondary'
                              : 'bg-bone/40 border border-bone/70 text-accent hover:bg-secondary hover:text-white'
                          }`}
                        >
                          {language === 'id' ? 'Detail' : 'Explore'} &rarr;
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
                    sizes="(max-width: 768px) 100vw, 400px"
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

            {/* Right Column: Sticky Window Map (7/12) — same as Homepage */}
            <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-[100px] w-full h-[380px] sm:h-[450px] lg:h-[calc(100vh-140px)] rounded-2xl overflow-hidden shadow-md">
              <MedanMap
                pins={mapPins}
                language={language}
                centerLat={walk.latitude || 3.589882}
                centerLng={walk.longitude || 98.677843}
                zoom={15}
                activePinId={activeLocationSlug}
                onPinClick={(slug) => setActiveLocationSlug(slug)}
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
