'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Globe, Calendar, Folder } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContentBlocks from '@/components/ui/ContentBlocks';
import { getCeritaBySlug, getAllCerita } from '@/data/db';
import { useLanguage } from '@/context/LanguageContext';

export default function CeritaDetail({ slug }: { slug: string }) {
  const { language, setLanguage } = useLanguage();

  const story = getCeritaBySlug(slug);

  if (!story) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-accent">Artikel Tidak Ditemukan</h2>
          <p className="mt-2 text-text-muted">Maaf, cerita dengan slug "{slug}" belum terdaftar.</p>
          <Link href="/cerita" className="mt-6 flex items-center text-primary font-bold hover:underline">
            <ChevronLeft className="mr-1.5 h-4 w-4" /> Kembali ke Cerita
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Find related stories sharing at least one category, excluding current story
  const allStories = getAllCerita();
  const relatedStories = allStories
    .filter((s) => s.slug !== slug && s.categories.some((cat) => story.categories.includes(cat)))
    .slice(0, 2); // Show up to 2 related articles

  const title = language === 'id' ? story.title_id : story.title_en;
  const formattedDate = new Date(story.publishedDate).toLocaleDateString(
    language === 'id' ? 'id-ID' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  const breadcrumbsItems = [
    { label: language === 'id' ? 'Cerita' : 'Stories', path: '/cerita' },
    { label: title },
  ];

  const bodyBlocks = language === 'id' ? story.body_id : story.body_en;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Breadcrumb row */}
        <div className="bg-bone/30 border-b border-bone/40 py-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbsItems} />
          </div>
        </div>

        {/* Article Container */}
        <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Header Metadata */}
          <header className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-text-muted">
                <span className="flex items-center">
                  <Calendar className="mr-1 h-3.5 w-3.5 text-secondary" />
                  {formattedDate}
                </span>
                <span className="flex items-center">
                  <Folder className="mr-1 h-3.5 w-3.5 text-secondary" />
                  {story.categories.join(', ')}
                </span>
              </div>

              {/* Bilingual Switcher */}
              <div className="flex items-center gap-2 bg-bone/35 border border-bone/70 px-3 py-1 rounded-xl text-xs font-semibold text-text-muted shadow-sm">
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

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-accent leading-tight">
              {title}
            </h1>
          </header>

          {/* Hero Banner image */}
          <div className="relative h-[250px] sm:h-[400px] w-full overflow-hidden rounded-2xl bg-bone border border-bone/50 shadow-sm mb-10">
            <Image
              src={story.coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* Article Contents */}
          <section className="prose max-w-none mb-16">
            <ContentBlocks blocks={bodyBlocks} language={language} />
          </section>

          {/* Related Stories Section */}
          {relatedStories.length > 0 && (
            <section className="border-t border-bone/45 pt-10 mt-12">
              <h3 className="font-serif text-xl font-bold text-accent mb-6">
                {language === 'id' ? 'Cerita Terkait' : 'Related Stories'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedStories.map((relStory) => {
                  const relTitle = language === 'id' ? relStory.title_id : relStory.title_en;
                  const relExcerpt = language === 'id' ? relStory.excerpt_id : relStory.excerpt_en;
                  
                  return (
                    <Link
                      key={relStory.slug}
                      href={`/cerita/${relStory.slug}`}
                      className="group block bg-white rounded-xl border border-bone/60 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative h-32 w-full rounded-lg overflow-hidden bg-bone mb-4">
                        <Image
                          src={relStory.coverImage}
                          alt={relTitle}
                          fill
                          className="object-cover group-hover:scale-102 transition-transform duration-300"
                          sizes="280px"
                        />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">
                        {relStory.categories.join(' • ')}
                      </span>
                      <h4 className="font-serif font-bold text-accent group-hover:text-secondary transition-colors text-base line-clamp-1 mt-1">
                        {relTitle}
                      </h4>
                      <p className="text-xs text-text-muted font-light mt-1.5 line-clamp-2 leading-relaxed">
                        {relExcerpt}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

        </article>
      </main>

      <Footer />
    </div>
  );
}
