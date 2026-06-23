'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CeritaCard } from '@/components/ui/Card';
import { getAllCerita, getAllKawasan, getAllCeritaCategories } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, MapPin, Grid, RefreshCw } from 'lucide-react';
import Link from 'next/link';

function CeritaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  const allStories = getAllStoriesSorted();
  const kawasanList = getAllKawasan();
  const categoriesList = getAllCeritaCategories();

  // Get active filters from URL query parameters
  const activeKawasan = searchParams?.get('kawasan') || '';
  const activeCategory = searchParams?.get('kategori') || '';

  function getAllStoriesSorted() {
    return getAllCerita().sort(
      (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  }

  // Handle filter changes by updating query parameters
  const handleFilter = (type: 'kawasan' | 'kategori', value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (type === 'kawasan') {
      if (value) {
        params.set('kawasan', value);
      } else {
        params.delete('kawasan');
      }
    } else if (type === 'kategori') {
      if (value) {
        params.set('kategori', value);
      } else {
        params.delete('kategori');
      }
    }
    router.push(`/cerita?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    router.push('/cerita', { scroll: false });
  };

  // Filter logic
  const filteredStories = allStories.filter((story) => {
    const matchesKawasan = !activeKawasan || story.neighbourhoodSlug.toLowerCase() === activeKawasan.toLowerCase();
    const matchesCategory = !activeCategory || story.categories.some(c => c.toLowerCase() === activeCategory.toLowerCase());
    return matchesKawasan && matchesCategory;
  });

  // Featured Hero Story (only if no filters are active)
  const featuredStory = !activeKawasan && !activeCategory 
    ? allStories.find((s) => s.featured) || allStories[0]
    : null;

  const storiesList = featuredStory
    ? filteredStories.filter((s) => s.slug !== featuredStory.slug)
    : filteredStories;

  const translations = {
    title: language === 'id' ? 'Cerita Medan Simpang' : 'Medan Simpang Stories',
    intro: language === 'id'
      ? 'Kumpulan artikel seputar arsitektur cagar budaya, sejarah perkebunan Deli, kuliner legendaris, dan cerita komunitas yang menghidupkan simpang-simpang Kota Medan.'
      : 'A collection of articles on heritage architecture, Deli plantation history, legendary eateries, and community stories that breathe life into Medan\'s intersections.',
    filterKawasan: language === 'id' ? 'Filter Kawasan' : 'Filter by Neighbourhood',
    filterKategori: language === 'id' ? 'Filter Kategori' : 'Filter by Category',
    reset: language === 'id' ? 'Atur Ulang' : 'Clear Filters',
    featuredTag: language === 'id' ? 'Pilihan Redaksi' : 'Featured Story',
    emptyTitle: language === 'id' ? 'Cerita Tidak Ditemukan' : 'No Stories Found',
    emptyDesc: language === 'id'
      ? 'Maaf, tidak ada artikel yang cocok dengan filter yang Anda pilih.'
      : 'Sorry, no articles match your selected filters.',
    readMore: language === 'id' ? 'Baca cerita lengkap' : 'Read full story',
    allKawasan: language === 'id' ? 'Semua Kawasan' : 'All Districts',
    allKategori: language === 'id' ? 'Semua Kategori' : 'All Categories',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      {/* Filters Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-bone/25 rounded-2xl border border-bone/60 p-6 space-y-6 sticky top-28">
          
          <div className="flex items-center justify-between border-b border-bone/40 pb-3">
            <h3 className="font-serif text-lg font-bold text-accent">Filter</h3>
            {(activeKawasan || activeCategory) && (
              <button
                onClick={handleReset}
                className="flex items-center text-xs font-bold text-secondary hover:text-accent gap-1 transition-colors uppercase tracking-wider"
              >
                <RefreshCw className="w-3 h-3" />
                {translations.reset}
              </button>
            )}
          </div>

          {/* Kawasan Filter */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-secondary" />
              {translations.filterKawasan}
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleFilter('kawasan', '')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  !activeKawasan
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white border-bone hover:border-gray-400 text-text-muted'
                }`}
              >
                {translations.allKawasan}
              </button>
              {kawasanList.map((k) => (
                <button
                  key={k.slug}
                  onClick={() => handleFilter('kawasan', k.slug)}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    activeKawasan === k.slug
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-bone hover:border-gray-400 text-text-muted'
                  }`}
                >
                  {k.name}
                </button>
              ))}
            </div>
          </div>

          {/* Kategori Filter */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-secondary" />
              {translations.filterKategori}
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleFilter('kategori', '')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  !activeCategory
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white border-bone hover:border-gray-400 text-text-muted'
                }`}
              >
                {translations.allKategori}
              </button>
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter('kategori', cat)}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-bone hover:border-gray-400 text-text-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Stories Listing Feed */}
      <div className="lg:col-span-3 space-y-12">
        
        {/* Featured Hero Story (only visible when filters are empty) */}
        {featuredStory && (
          <div className="group relative overflow-hidden rounded-2xl border border-bone/60 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden bg-bone">
              <Image
                src={featuredStory.coverImage}
                alt={language === 'id' ? featuredStory.title_id : featuredStory.title_en}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-101"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/95 via-accent/40 to-transparent" />
              <div className="absolute top-4 left-4 rounded-md bg-primary px-3 py-1 text-xs font-bold text-accent uppercase tracking-wider">
                {translations.featuredTag}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white space-y-3">
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-primary/95 uppercase tracking-wider">
                  {featuredStory.categories.join(' • ')}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
                  {language === 'id' ? featuredStory.title_id : featuredStory.title_en}
                </h2>
                <p className="text-sm font-light text-gray-300 line-clamp-2 max-w-2xl">
                  {language === 'id' ? featuredStory.excerpt_id : featuredStory.excerpt_en}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/cerita/${featuredStory.slug}`}
                    className="inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-bold text-accent hover:bg-primary/90 transition-colors uppercase tracking-wider"
                  >
                    {translations.readMore} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular list of stories */}
        <div className="space-y-6">
          {storiesList.map((story) => (
            <CeritaCard key={story.slug} cerita={story} />
          ))}

          {/* Empty State */}
          {filteredStories.length === 0 && (
            <div className="text-center py-16 bg-bone/15 border border-dashed border-bone rounded-2xl">
              <BookOpen className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-accent">{translations.emptyTitle}</h3>
              <p className="text-sm text-text-muted mt-1 font-light">{translations.emptyDesc}</p>
              <button
                onClick={handleReset}
                className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-accent shadow-sm hover:bg-primary/95 transition-all uppercase tracking-wider"
              >
                {translations.reset}
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default function CeritaListing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 pb-20">
        {/* Intro Section */}
        <section className="bg-bone/15 py-12 md:py-16 border-b border-bone/45 mb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/20 border border-primary/40 text-accent uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5 text-secondary" />
              Cerita / Stories
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-accent leading-tight">
              Cerita Medan Simpang
            </h1>
            <p className="mt-4 text-base md:text-lg text-text-muted font-light leading-relaxed">
              Kumpulan artikel seputar arsitektur cagar budaya, sejarah perkebunan Deli, kuliner legendaris, dan cerita komunitas yang menghidupkan simpang-simpang Kota Medan.
            </p>
          </div>
        </section>

        {/* Dynamic Filters & Content Feed */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
            </div>
          }>
            <CeritaContent />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}
