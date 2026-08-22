import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import CloudflareWebAnalytics from "@/components/analytics/CloudflareWebAnalytics";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  title: {
    default: "UrbanMorphSoc — Urban Morphology and Society",
    template: "%s | UrbanMorphSoc",
  },
  description: "UrbanMorphSoc adalah klaster riset Urban Morphology and Society di Universitas Sumatera Utara yang mengkaji hubungan bentuk kota, ruang, dan kehidupan masyarakat.",
  metadataBase: new URL("https://urbanmorphsoc.com"),
  alternates: { canonical: "/" },
  keywords: [
    "UrbanMorphSoc",
    "Urban Morphology and Society",
    "morfologi kota",
    "urban morphology",
    "Universitas Sumatera Utara",
    "Medan Simpang",
  ],
  robots: { index: true, follow: true },
  verification: googleVerification ? { google: googleVerification } : undefined,
  icons: { icon: "/main-favicon.png" },
  openGraph: {
    title: "Urban Morphology and Society",
    description: "A research cluster studying the morphology of buildings, neighbourhoods, and cities — and its relationship with society.",
    url: "https://urbanmorphsoc.com",
    siteName: "Urban Morphology and Society",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/frontpage.webp",
        width: 1200,
        height: 630,
        alt: "UrbanMorphSoc — Urban Morphology and Society",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbanMorphSoc — Urban Morphology and Society",
    description: "Riset tentang hubungan bentuk kota, ruang, dan kehidupan masyarakat.",
    images: ["/images/frontpage.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FDFBF7",
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://urbanmorphsoc.com/#organization",
      name: "Urban Morphology and Society",
      alternateName: ["UrbanMorphSoc", "UMS"],
      url: "https://urbanmorphsoc.com/",
      logo: "https://urbanmorphsoc.com/main-favicon.png",
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Sumatera Utara",
        url: "https://usu.ac.id/",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Medan",
        addressRegion: "Sumatera Utara",
        addressCountry: "ID",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://urbanmorphsoc.com/#website",
      url: "https://urbanmorphsoc.com/",
      name: "UrbanMorphSoc",
      alternateName: "Urban Morphology and Society",
      inLanguage: ["id-ID", "en"],
      publisher: { "@id": "https://urbanmorphsoc.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <CloudflareWebAnalytics />
      </body>
    </html>
  );
}

