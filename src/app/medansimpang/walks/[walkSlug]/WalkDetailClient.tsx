'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Navigation, MapPin, Download, ArrowLeft, ArrowRight, Eye, Utensils, Coffee, Compass, LayoutGrid, Map, List } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Badge from '@/components/ui/Badge';
import LocationMedia from '@/components/ui/LocationMedia';
import { getWalkBySlug, getKawasanBySlug, getLocationsForWalk, getWalksForKawasan } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';
import { CategoryType } from '@/types';
import { assetPath } from '@/lib/paths';
import useMediaQuery from '@/hooks/useMediaQuery';
import useConstrainedNetwork from '@/hooks/useConstrainedNetwork';
import DeferredMapNotice from '@/components/map/DeferredMapNotice';

// Dynamically import map client-side to prevent SSR window reference error
const MedanMap = dynamic(() => import('@/components/map/MedanMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bone/35 text-accent/70">
      <MapPin className="mb-2 h-7 w-7 text-primary-strong" />
      <span className="text-sm font-semibold">Memuat peta…</span>
    </div>
  ),
});

export default function WalkDetail({ walkSlug }: { walkSlug: string }) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'All'>('All');
  const [activeLocationSlug, setActiveLocationSlug] = useState<string | undefined>(undefined);
  // Mobile view mode: 'list' (default) or 'map'
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [mapRequested, setMapRequested] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isConstrainedNetwork = useConstrainedNetwork();
  const shouldRenderMap = mobileView === 'map' || (isDesktop && (!isConstrainedNetwork || mapRequested));

  const walk = getWalkBySlug(walkSlug);

  if (!walk) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow flex flex-col items-center justify-center pt-32 px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-accent">Rute Tidak Ditemukan</h2>
          <p className="mt-2 text-text-muted">Maaf, rute jalan kaki dengan slug &quot;{walkSlug}&quot; belum terdaftar.</p>
          <Link href="/medansimpang" className="mt-6 flex items-center text-primary font-bold hover:underline">
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
    { label: kawasan?.name || 'Kawasan', path: `/medansimpang/${walk.neighbourhoodSlug}` },
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

  const filterChips: { key: CategoryType | 'All'; label: string; color: string; icon: React.ReactNode }[] = [
    { key: 'All', label: language === 'id' ? 'Semua' : 'All', color: 'bg-accent text-white border-accent', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { key: 'iSee', label: language === 'id' ? 'Situs' : 'Sites', color: 'bg-isee text-white border-isee', icon: <Eye className="w-3.5 h-3.5" /> },
    { key: 'iEat', label: language === 'id' ? 'Kuliner' : 'Eats', color: 'bg-ieat text-white border-ieat', icon: <Utensils className="w-3.5 h-3.5" /> },
    { key: 'iDrink', label: language === 'id' ? 'Minuman' : 'Drinks', color: 'bg-idrink text-white border-idrink', icon: <Coffee className="w-3.5 h-3.5" /> },
    { key: 'iSurprise', label: language === 'id' ? 'Unik' : 'Surprises', color: 'bg-isurprise text-white border-isurprise', icon: <Compass className="w-3.5 h-3.5" /> },
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
      linkUrl: `/medansimpang/walks/${walkSlug}/lokasi/${loc.slug}`,
      linkText: language === 'id' ? 'Detail Lokasi' : 'Explore Stop',
    },
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main scrollable grid container — same pattern as Homepage */}
      <main className="grow pb-24 pt-26 sm:pt-28 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
            
            {/* Left Column: Walk Content (5/12) */}
            <div className={`min-w-0 space-y-7 ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
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
                  <Link href={`/medansimpang/${walk.neighbourhoodSlug}`} className="underline font-bold text-secondary hover:text-primary">
                    {kawasan?.name}
                  </Link>
                  {` • `}
                  {language === 'id' ? 'Terakhir diperbarui: ' : 'Last updated: '} {walk.lastUpdated}
                </p>
              </div>

              {/* Info Strip (compact horizontal) */}
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-bone/70 bg-white px-4 py-3 text-center sm:gap-4">
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
              </div>

              {/* Description follows the global language selected in the header */}
              <div className="border-t border-bone/45 pt-6">
                <p className="text-sm md:text-base text-text-main font-light leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Category Filter Chips - Mobile Scrollable */}
              <div className="space-y-4 border-t border-bone/45 pt-6">
                <h3 className="font-serif text-xl font-bold text-accent">
                  {language === 'id' ? 'Filter Kategori' : 'Category Filter'}
                </h3>
                <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1.5 pt-0.5 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                  {filterChips.map((chip) => {
                    const count = getCategoryCount(chip.key);
                    const isActive = activeCategory === chip.key;
                    
                    return (
                      <button
                        key={chip.key}
                        onClick={() => setActiveCategory(chip.key)}
                        className={`inline-flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                          isActive
                            ? `${chip.color} shadow-sm scale-103`
                            : 'border-bone bg-white text-text-muted hover:border-gray-400'
                        }`}
                      >
                        {chip.icon}
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
                
                <div className="content-auto space-y-3">
                  {filteredLocations.map((loc) => {
                    const name = language === 'id' ? loc.name_id : loc.name_en;
                    const subtitle = language === 'id' ? loc.shortDescription_id : loc.shortDescription_en;
                    const isHovered = activeLocationSlug === loc.slug;
                    
                    return (
                      <Link
                        key={loc.slug}
                        href={`/medansimpang/walks/${walkSlug}/lokasi/${loc.slug}`}
                        onMouseEnter={() => setActiveLocationSlug(loc.slug)}
                        onMouseLeave={() => setActiveLocationSlug(undefined)}
                        className={`group grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-white p-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                          isHovered
                            ? 'border-secondary/70 bg-secondary/5'
                            : 'border-bone/70 hover:border-secondary/45'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                            isHovered ? 'bg-secondary text-white' : 'bg-accent text-white'
                          }`}>
                            {loc.order}
                          </div>
                          <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-bone sm:h-16 sm:w-20">
                            <LocationMedia
                              imageUrl={loc.thumbnail}
                              name={name}
                              latitude={loc.latitude}
                              longitude={loc.longitude}
                              sizes="80px"
                            />
                          </div>
                        </div>

                        {/* Location Details */}
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className={`min-w-0 font-serif text-sm font-bold leading-snug transition-colors duration-300 md:text-base ${
                              isHovered ? 'text-secondary' : 'text-accent'
                            }`}>
                              {name}
                            </h4>
                            <Badge category={loc.category} lang={language} />
                          </div>
                          <p className="line-clamp-2 text-xs leading-relaxed text-accent/70">
                            {subtitle}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-primary-strong transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
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
              <div className="space-y-4 rounded-xl border border-bone/70 bg-white p-5">
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
                  href={assetPath(walk.downloadableMapImage)}
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
                          href={`/medansimpang/walks/${nWalk.slug}`}
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
            <div className={`min-w-0 w-full overflow-hidden rounded-xl bg-bone/35 lg:sticky lg:top-[104px] ${
              mobileView === 'map' ? 'block h-[calc(100dvh-154px)]' : 'hidden lg:block lg:h-[calc(100vh-124px)]'
            }`}>
              {shouldRenderMap ? (
                <MedanMap
                  pins={mapPins}
                  routes={walk.route ? [{ coordinates: walk.route }] : undefined}
                  language={language}
                  centerLat={walk.latitude || 3.589882}
                  centerLng={walk.longitude || 98.677843}
                  zoom={16.5}
                  activePinId={activeLocationSlug}
                  onPinClick={(slug) => setActiveLocationSlug(slug)}
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
