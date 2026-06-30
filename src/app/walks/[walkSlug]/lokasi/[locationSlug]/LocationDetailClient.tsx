'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Clock, Globe, Share2, Compass, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import ContentBlocks from '@/components/ui/ContentBlocks';
import { getLocationBySlug, getWalkBySlug, getLocationsForWalk } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';

export default function LocationDetail({ walkSlug, locationSlug }: { walkSlug: string, locationSlug: string }) {
  const { language, setLanguage } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const walk = getWalkBySlug(walkSlug);
  const location = getLocationBySlug(locationSlug);

  if (!location || !walk) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-accent">Lokasi Tidak Ditemukan</h2>
          <p className="mt-2 text-text-muted">Maaf, detail lokasi atau rute tidak ditemukan.</p>
          <Link href="/" className="mt-6 flex items-center text-primary font-bold hover:underline">
            <ChevronLeft className="mr-1.5 h-4 w-4" /> Kembali ke Beranda
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const walkLocations = getLocationsForWalk(walkSlug);
  const currentIndex = walkLocations.findIndex((loc) => loc.slug === locationSlug);
  const nextLocation = currentIndex !== -1 && currentIndex < walkLocations.length - 1
    ? walkLocations[currentIndex + 1]
    : null;

  const name = language === 'id' ? location.name_id : location.name_en;
  const subtitle = language === 'id' ? location.shortDescription_id : location.shortDescription_en;
  const address = language === 'id' ? location.address_id : location.address_en;
  const hours = language === 'id' ? location.openingHours_id : location.openingHours_en;
  const walkTitle = language === 'id' ? walk.title_id : walk.title_en;

  // Gallery as a single-frame carousel (fallback to thumbnail if empty)
  const images = location.gallery.length > 0 ? location.gallery : [location.thumbnail];
  const safeIndex = Math.min(activeImage, images.length - 1);
  const goPrev = () => setActiveImage((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveImage((i) => (i + 1) % images.length);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: subtitle, url });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log('Clipboard failed:', err);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Sub-header Navigation */}
        <div className="bg-bone/30 border-b border-bone/40 py-4">
          <div className="w-full px-6 lg:px-12 flex items-center justify-between">
            <Link
              href={`/walks/${walkSlug}`}
              className="inline-flex items-center text-sm font-bold text-accent hover:text-secondary transition-colors"
            >
              <ChevronLeft className="mr-1.5 h-4.5 w-4.5 text-secondary" />
              <span className="truncate max-w-[200px] sm:max-w-xs">{walkTitle}</span>
            </Link>

            {/* Bilingual Switcher */}
            <div className="flex items-center gap-2 bg-white border border-bone/70 px-3 py-1 rounded-xl text-xs font-semibold text-text-muted shadow-sm">
              <Globe className="h-3.5 w-3.5 text-secondary" />
              <button
                onClick={() => setLanguage('id')}
                className={`px-1.5 py-0.5 rounded ${language === 'id' ? 'bg-primary text-accent font-bold' : ''}`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-primary text-accent font-bold' : ''}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Full-width split layout: carousel (left) + info (right) */}
        <div className="w-full px-6 lg:px-12 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT: Single-frame image carousel (sticky window) */}
            <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-[100px]">
              <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[calc(100vh-160px)] rounded-2xl overflow-hidden bg-bone border border-bone/60 shadow-md group">
                <Image
                  key={safeIndex}
                  src={images[safeIndex]}
                  alt={`${name} — ${safeIndex + 1}`}
                  fill
                  priority
                  className="object-cover animate-fade-in"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Order + Category badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="w-8 h-8 rounded-full bg-accent/90 text-white font-bold text-sm flex items-center justify-center shadow-md backdrop-blur-sm">
                    {location.order}
                  </span>
                  <Badge category={location.category} lang={language} />
                </div>

                {/* Carousel controls (only when more than 1 image) */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      aria-label="Foto sebelumnya"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/85 text-accent shadow-md backdrop-blur-sm hover:bg-white hover:scale-105 active:scale-95 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goNext}
                      aria-label="Foto berikutnya"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/85 text-accent shadow-md backdrop-blur-sm hover:bg-white hover:scale-105 active:scale-95 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-accent/80 text-white text-xs font-bold px-3 py-1 backdrop-blur-sm shadow-sm">
                      {safeIndex + 1} / {images.length}
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1.5 backdrop-blur-sm">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          aria-label={`Foto ${idx + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            idx === safeIndex ? 'w-5 bg-white' : 'w-2 bg-white/55 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT: Location info & content */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-8">
              {/* Title block */}
              <header className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-accent leading-tight">
                  {name}
                </h1>
                <p className="text-base text-text-muted font-light leading-relaxed">
                  {subtitle}
                </p>
              </header>

              {/* Quick info: address + hours */}
              <div className="bg-bone/25 rounded-2xl border border-bone/50 p-6 space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-secondary" />
                    {language === 'id' ? 'Alamat' : 'Address'}
                  </span>
                  <p className="text-sm font-light text-text-main leading-relaxed">{address}</p>
                </div>

                <div className="space-y-1.5 border-t border-bone/50 pt-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-secondary" />
                    {language === 'id' ? 'Jam Operasional' : 'Opening Hours'}
                  </span>
                  <p className="text-sm font-light text-text-main leading-relaxed">{hours}</p>
                </div>

                {/* Actions */}
                <div className="border-t border-bone/50 pt-4 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white border border-bone px-4 py-2.5 text-xs font-bold text-accent shadow-sm hover:bg-bone/35 active:scale-[0.98] transition-all uppercase tracking-wider"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-secondary" />
                          <span>{language === 'id' ? 'Tersalin!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 text-secondary" />
                          <span>{language === 'id' ? 'Bagikan' : 'Share Spot'}</span>
                        </>
                      )}
                    </button>

                    <div className="relative flex-1">
                      <button
                        onClick={() => setShowDirections(!showDirections)}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-accent shadow-sm hover:bg-primary/95 active:scale-[0.98] transition-all uppercase tracking-wider"
                      >
                        <Compass className="w-4 h-4" />
                        <span>{language === 'id' ? 'Petunjuk Arah' : 'Get Directions'}</span>
                      </button>

                      {showDirections && (
                        <div className="absolute right-0 left-0 mt-2 rounded-lg bg-white shadow-lg border border-bone p-1.5 z-20 space-y-1">
                          <a
                            href={location.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-xs font-semibold text-text-main hover:bg-bone/45 rounded transition-colors"
                          >
                            Google Maps
                          </a>
                          <a
                            href={location.appleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-xs font-semibold text-text-main hover:bg-bone/45 rounded transition-colors"
                          >
                            Apple Maps (iOS)
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {location.websiteUrl && (
                    <a
                      href={location.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center text-center text-[10px] font-bold text-secondary hover:underline py-1"
                    >
                      {language === 'id' ? 'Kunjungi Situs Web' : 'Visit Website'} &rarr;
                    </a>
                  )}
                </div>
              </div>

              {/* Rich Content Body */}
              <section className="prose max-w-none border-t border-bone/45 pt-6">
                <ContentBlocks blocks={location.contentBlocks} language={language} />
              </section>

              {/* Next Stop CTA */}
              {nextLocation && (
                <section className="pt-6 border-t border-bone/45">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-3">
                    {language === 'id' ? 'Titik Singgah Berikutnya' : 'Next Stop on Trail'}
                  </span>
                  <Link
                    href={`/walks/${walkSlug}/lokasi/${nextLocation.slug}`}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-bone hover:border-secondary/40 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                        {nextLocation.order}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-accent text-lg leading-tight group-hover:text-secondary transition-colors">
                          {language === 'id' ? nextLocation.name_id : nextLocation.name_en}
                        </h4>
                        <p className="text-xs text-text-muted font-light mt-0.5 line-clamp-1">
                          {language === 'id' ? nextLocation.shortDescription_id : nextLocation.shortDescription_en}
                        </p>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-bone/40 group-hover:bg-primary group-hover:translate-x-1.5 transition-all flex items-center justify-center text-accent flex-shrink-0 ml-3">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                </section>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
