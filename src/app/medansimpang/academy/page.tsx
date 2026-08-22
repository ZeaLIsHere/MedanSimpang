'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock3, Gamepad2, Trophy } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function AcademyPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="grow pb-20 pt-40">
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-balance font-serif text-4xl font-black leading-tight tracking-[-0.025em] text-accent sm:text-5xl">
              {id ? 'Akademi Medan Simpang' : 'Medan Simpang Academy'}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base font-light leading-7 text-text-muted sm:text-lg">
              {id
                ? 'Belajar membaca kota melalui aktivitas interaktif yang dekat dengan kawasan, sejarah, dan kehidupan sehari-hari di Medan.'
                : 'Learn to read the city through interactive activities connected to Medan’s neighbourhoods, history, and everyday life.'}
            </p>
          </div>

          <Link
            href="/medansimpang/game"
            aria-label={id ? 'Buka Quiz Medan Simpang' : 'Open the Medan Simpang Quiz'}
            className="group mt-10 grid overflow-hidden rounded-xl border border-bone/70 bg-white transition-colors hover:border-secondary/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative min-h-72 overflow-hidden sm:min-h-96 lg:min-h-105">
              <Image
                src="/images/locations/smp-negeri-7-medan/gallery-4.jpg"
                alt={id ? 'Halaman SMP Negeri 7 Medan' : 'The courtyard of SMP Negeri 7 Medan'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-accent/85 via-accent/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="max-w-md text-sm font-medium leading-relaxed text-white/90">
                  {id
                    ? 'Kenali tempat, jejak sejarah, dan cerita warga melalui permainan kelas realtime.'
                    : 'Discover places, historical traces, and community stories through a realtime classroom game.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20 text-primary-strong">
                <Gamepad2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-6 font-serif text-3xl font-black leading-tight text-accent sm:text-4xl">
                Quiz Medan Simpang
              </h2>
              <p className="mt-4 text-sm font-light leading-6 text-text-muted sm:text-base">
                {id
                  ? 'Masuk menggunakan kode room dari host, jawab setiap pertanyaan, dan lihat peringkat bersama peserta lain.'
                  : 'Join with a room code from the host, answer each question, and see your ranking with the other participants.'}
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-y border-bone/60 py-4 text-sm font-semibold text-accent/85">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-secondary" aria-hidden="true" />
                  {id ? '10 detik per soal' : '10 seconds per question'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-secondary" aria-hidden="true" />
                  {id ? 'Peringkat realtime' : 'Realtime leaderboard'}
                </span>
              </div>

              <span className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-secondary px-5 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-isee">
                {id ? 'Buka quiz' : 'Open quiz'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
