'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Gamepad2, ShieldCheck } from 'lucide-react';

const QUIZ_ORIGIN = process.env.NEXT_PUBLIC_QUIZ_ORIGIN || 'https://quiz-smpn7-production.up.railway.app';

type GameFrameProps = {
  mode: 'participant' | 'admin';
};

export default function GameFrame({ mode }: GameFrameProps) {
  const [source, setSource] = useState('');
  const [loaded, setLoaded] = useState(false);
  const isAdmin = mode === 'admin';

  useEffect(() => {
    const target = new URL(isAdmin ? '/admin' : '/join', QUIZ_ORIGIN);
    if (!isAdmin) {
      const room = new URLSearchParams(window.location.search).get('room')?.toUpperCase() || '';
      if (/^[A-Z0-9]{1,6}$/.test(room)) target.searchParams.set('room', room);
    }
    setSource(target.toString());
  }, [isAdmin]);

  const directUrl = source || new URL(isAdmin ? '/admin' : '/join', QUIZ_ORIGIN).toString();

  return (
    <div className="flex h-dvh min-h-125 flex-col overflow-hidden bg-background">
      <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-bone/60 bg-white px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/medansimpang"
            aria-label="Kembali ke Medan Simpang"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-accent transition-colors hover:bg-bone/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Link href="/medansimpang" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Medan Simpang"
              width={150}
              height={45}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <span className="hidden h-7 w-px bg-bone/80 sm:block" aria-hidden="true" />
          <strong className="hidden truncate text-sm text-accent sm:block">
            {isAdmin ? 'Admin Quiz' : 'Quiz Medan Simpang'}
          </strong>
        </div>

        <nav className="flex shrink-0 items-center gap-1.5" aria-label="Navigasi game">
          <Link
            href="/medansimpang/game"
            aria-current={!isAdmin ? 'page' : undefined}
            className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
              !isAdmin ? 'bg-secondary text-white' : 'text-accent hover:bg-bone/40'
            }`}
          >
            <Gamepad2 className="h-4 w-4" />
            <span className="hidden sm:inline">Peserta</span>
          </Link>
          <Link
            href="/medansimpang/game/admin"
            aria-current={isAdmin ? 'page' : undefined}
            className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
              isAdmin ? 'bg-accent text-white' : 'text-accent hover:bg-bone/40'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka game langsung di tab baru"
            title="Buka langsung di tab baru"
            className="inline-flex size-10 items-center justify-center rounded-lg text-accent transition-colors hover:bg-bone/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </nav>
      </header>

      <main className="relative min-h-0 flex-1 bg-[#f7f5ef]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center p-6" role="status" aria-live="polite">
            <div className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-sm">
              <div className="h-5 w-32 animate-pulse rounded bg-bone" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-bone/70" />
              <div className="h-10 w-4/5 animate-pulse rounded-lg bg-bone/55" />
              <p className="text-sm font-medium text-accent/75">Memuat Quiz Medan Simpang…</p>
            </div>
          </div>
        )}

        {source && (
          <iframe
            src={source}
            title={isAdmin ? 'Admin Quiz Medan Simpang' : 'Quiz Medan Simpang'}
            className={`h-full w-full border-0 transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            allow="clipboard-write; fullscreen"
          />
        )}
      </main>
    </div>
  );
}
