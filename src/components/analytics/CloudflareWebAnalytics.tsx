import Script from 'next/script';

/**
 * Cloudflare Web Analytics works on the static Hostinger export and keeps the
 * reporting credentials outside the browser. The public site token is injected
 * at build time; without it the site still renders normally.
 */
export default function CloudflareWebAnalytics() {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

  if (!token) return null;

  return (
    <Script
      id="cloudflare-web-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
