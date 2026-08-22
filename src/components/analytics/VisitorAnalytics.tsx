'use client';

import { useEffect, useMemo, useState } from 'react';
import { Globe2, Radio, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type CountryStat = {
  code: string;
  visitors: number;
};

type VisitorStats = {
  todayVisitors: number;
  totalVisitors: number;
  countryCount: number;
  countries: CountryStat[];
  updatedAt: string;
};

const analyticsEndpoint =
  process.env.NEXT_PUBLIC_VISITOR_ANALYTICS_ENDPOINT?.trim() || '/api/visitors';

const VISITOR_ID_KEY = 'ums-visitor-id-v1';
const REFRESH_INTERVAL_MS = 15_000;

function createVisitorId() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function getVisitorId() {
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;

    const visitorId = createVisitorId();
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
  } catch {
    return createVisitorId();
  }
}

function countryFlag(countryCode: string) {
  if (!/^[A-Z]{2}$/.test(countryCode)) return '🌐';
  return String.fromCodePoint(
    ...countryCode.split('').map((letter) => 127397 + letter.charCodeAt(0)),
  );
}

export default function VisitorAnalytics() {
  const { language } = useLanguage();
  const id = language === 'id';
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(id ? 'id-ID' : 'en-US'),
    [id],
  );

  const regionNames = useMemo(
    () => new Intl.DisplayNames([id ? 'id' : 'en'], { type: 'region' }),
    [id],
  );

  useEffect(() => {
    let cancelled = false;

    const requestStats = async (recordVisit: boolean) => {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 8_000);

      try {
        const response = await fetch(analyticsEndpoint, {
          method: recordVisit ? 'POST' : 'GET',
          headers: recordVisit
            ? { 'Content-Type': 'application/json', Accept: 'application/json' }
            : { Accept: 'application/json' },
          body: recordVisit ? JSON.stringify({ visitorId: getVisitorId() }) : undefined,
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Analytics request failed: ${response.status}`);

        const nextStats = (await response.json()) as VisitorStats;
        if (!cancelled) {
          setStats(nextStats);
          setStatus('ready');
        }
      } catch {
        if (!cancelled) {
          setStatus((currentStatus) =>
            currentStatus === 'ready' ? currentStatus : 'error',
          );
        }
      } finally {
        window.clearTimeout(timeout);
      }
    };

    void requestStats(true);
    const refreshTimer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void requestStats(false);
    }, REFRESH_INTERVAL_MS);

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') void requestStats(false);
    };
    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      cancelled = true;
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, []);

  const getCountryName = (code: string) => {
    if (code === 'XX') return id ? 'Tidak diketahui' : 'Unknown';

    try {
      return regionNames.of(code) || code;
    } catch {
      return code;
    }
  };

  return (
    <section
      className="border-y border-primary/35 bg-bone text-accent"
      aria-labelledby="visitor-analytics-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-18 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-primary-strong">
              <Radio className="h-4 w-4" aria-hidden="true" />
              {id ? 'Data kunjungan langsung' : 'Live visitor data'}
            </div>
            <h2
              id="visitor-analytics-title"
              className="mt-4 max-w-xl text-balance font-serif text-3xl font-black leading-tight tracking-[-0.025em] sm:text-4xl"
            >
              {id ? 'Kota dibaca dari berbagai penjuru.' : 'The city is read from around the world.'}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-sm font-medium leading-7 text-accent/80 sm:text-base">
              {id
                ? 'Statistik ini berasal dari kunjungan nyata. Satu browser dihitung sekali per hari dan data diperbarui setiap 15 detik.'
                : 'These statistics come from real visits. One browser is counted once per day, with data refreshed every 15 seconds.'}
            </p>
          </div>

          {status === 'loading' && (
            <div className="flex min-h-52 items-center justify-center border-y border-accent/15 text-sm font-semibold text-accent/70" aria-live="polite">
              {id ? 'Memuat statistik kunjungan…' : 'Loading visitor statistics…'}
            </div>
          )}

          {status === 'error' && (
            <div className="flex min-h-52 flex-col justify-center border-y border-accent/15" role="status">
              <p className="font-serif text-2xl font-bold">
                {id ? 'Statistik belum terhubung' : 'Statistics are not connected yet'}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-accent/75">
                {id
                  ? 'Endpoint pencatat kunjungan belum aktif. Tidak ada angka contoh yang ditampilkan.'
                  : 'The visitor tracking endpoint is not active yet. No placeholder numbers are being shown.'}
              </p>
            </div>
          )}

          {status === 'ready' && stats && (
            <div aria-live="polite">
              <dl className="grid grid-cols-2 border-y border-accent/15 sm:grid-cols-3">
                <div className="py-5 pr-5 sm:py-6">
                  <dt className="text-xs font-bold text-accent/70">
                    {id ? 'Pengunjung hari ini' : 'Visitors today'}
                  </dt>
                  <dd className="mt-2 font-serif text-4xl font-black text-primary-strong sm:text-5xl">
                    {numberFormatter.format(stats.todayVisitors)}
                  </dd>
                </div>
                <div className="border-l border-accent/15 px-5 py-5 sm:py-6">
                  <dt className="text-xs font-bold text-accent/70">
                    {id ? 'Total pengunjung' : 'Total visitors'}
                  </dt>
                  <dd className="mt-2 font-serif text-4xl font-black text-primary-strong sm:text-5xl">
                    {numberFormatter.format(stats.totalVisitors)}
                  </dd>
                </div>
                <div className="col-span-2 border-t border-accent/15 py-5 sm:col-span-1 sm:border-l sm:border-t-0 sm:px-5 sm:py-6">
                  <dt className="text-xs font-bold text-accent/70">
                    {id ? 'Negara tercatat' : 'Countries recorded'}
                  </dt>
                  <dd className="mt-2 flex items-center gap-2 font-serif text-4xl font-black text-primary-strong sm:text-5xl">
                    <Globe2 className="h-7 w-7" aria-hidden="true" />
                    {numberFormatter.format(stats.countryCount)}
                  </dd>
                </div>
              </dl>

              <div className="mt-7">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold">
                    <Users className="h-4 w-4 text-secondary" aria-hidden="true" />
                    {id ? 'Asal pengunjung' : 'Visitor origins'}
                  </h3>
                  <time className="text-xs text-accent/60" dateTime={stats.updatedAt}>
                    {id ? 'Diperbarui langsung' : 'Updated live'}
                  </time>
                </div>

                {stats.countries.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {stats.countries.map((country) => (
                      <li
                        key={country.code}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold"
                      >
                        <span aria-hidden="true">{countryFlag(country.code)}</span>
                        <span>{getCountryName(country.code)}</span>
                        <span className="text-primary-strong">
                          {numberFormatter.format(country.visitors)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-accent/70">
                    {id ? 'Belum ada negara yang tercatat.' : 'No countries have been recorded yet.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
