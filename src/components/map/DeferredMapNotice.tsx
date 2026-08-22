'use client';

import { Map, SignalLow } from 'lucide-react';

interface DeferredMapNoticeProps {
  language: 'id' | 'en';
  onLoad: () => void;
}

export default function DeferredMapNotice({ language, onLoad }: DeferredMapNoticeProps) {
  const isIndonesian = language === 'id';

  return (
    <div className="flex h-full min-h-72 w-full flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary shadow-sm">
        <SignalLow className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="font-serif text-xl font-bold text-accent">
        {isIndonesian ? 'Peta dijeda untuk menghemat data' : 'Map paused to save data'}
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-accent/70">
        {isIndonesian
          ? 'Koneksi lambat atau mode hemat data terdeteksi. Daftar rute tetap dapat digunakan.'
          : 'A slow connection or data saver was detected. The route list remains available.'}
      </p>
      <button
        type="button"
        onClick={onLoad}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-white transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      >
        <Map className="h-4 w-4" aria-hidden="true" />
        {isIndonesian ? 'Muat peta' : 'Load map'}
      </button>
    </div>
  );
}
