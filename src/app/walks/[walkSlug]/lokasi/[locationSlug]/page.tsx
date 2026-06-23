'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin, Clock, Globe, Share2, Compass, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import ContentBlocks from '@/components/ui/ContentBlocks';
import { getLocationBySlug, getWalkBySlug, getLocationsForWalk } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';

export default function LocationDetail() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  const walkSlug = params?.walkSlug as string;
  const locationSlug = params?.locationSlug as string;

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

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: subtitle,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
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
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Sub-header Navigation */}
        <div className="bg-bone/30 border-b border-bone/40 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
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

        <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Title Section */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center">
                {location.order}
              </span>
              <Badge category={location.category} lang={language} />
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-accent leading-tight">
              {name}
            </h1>
            
            <p className="text-base sm:text-lg text-text-muted font-light leading-relaxed">
              {subtitle}
            </p>
          </header>

          {/* Image Gallery */}
          <section className="my-8 md:my-10">
            {location.gallery.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {location.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative overflow-hidden rounded-2xl bg-bone border border-bone/50 shadow-sm ${
                      location.gallery.length === 1 || (location.gallery.length === 3 && idx === 0)
                        ? 'sm:col-span-2 h-[250px] sm:h-[400px]'
                        : 'h-[180px] sm:h-[250px]'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${name} Gallery ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-103"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick Info Bar */}
          <section className="bg-bone/25 rounded-2xl border border-bone/50 p-6 md:p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start divide-y md:divide-y-0 md:divide-x divide-bone/50">
              
              {/* Address */}
              <div className="space-y-2 py-4 md:py-0 md:pr-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-secondary" />
                  {language === 'id' ? 'Alamat' : 'Address'}
                </span>
                <p className="text-sm font-light text-text-main leading-relaxed">
                  {address}
                </p>
              </div>

              {/* Hours */}
              <div className="space-y-2 py-4 md:py-0 md:px-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-secondary" />
                  {language === 'id' ? 'Jam Operasional' : 'Opening Hours'}
                </span>
                <p className="text-sm font-light text-text-main leading-relaxed">
                  {hours}
                </p>
              </div>

              {/* Actions Dropdown / Buttons */}
              <div className="space-y-3 py-4 md:py-0 md:pl-4">
                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-white border border-bone px-4 py-2.5 text-xs font-bold text-accent shadow-sm hover:bg-bone/35 active:scale-[0.98] transition-all uppercase tracking-wider"
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

                {/* Directions Button */}
                <div className="relative">
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

                {/* Website Button */}
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
          </section>

          {/* Rich Content Body (Rendering blocks) */}
          <section className="prose max-w-none">
            <ContentBlocks blocks={location.contentBlocks} language={language} />
          </section>

          {/* Next Stop CTA Navigation */}
          {nextLocation && (
            <section className="mt-16 pt-8 border-t border-bone/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-3">
                {language === 'id' ? 'Titik Singgah Berikutnya' : 'Next Stop on Trail'}
              </span>
              <Link
                href={`/walks/${walkSlug}/lokasi/${nextLocation.slug}`}
                className="group flex items-center justify-between p-6 rounded-2xl bg-white border border-bone hover:border-secondary/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
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
                
                <div className="w-10 h-10 rounded-full bg-bone/40 group-hover:bg-primary group-hover:translate-x-1.5 transition-all flex items-center justify-center text-accent">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </section>
          )}

        </article>
      </main>

      <Footer />
    </div>
  );
}
