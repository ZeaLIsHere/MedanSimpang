import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Medan Simpang — Panduan Heritage Walk Kota Medan",
    template: "%s | Medan Simpang",
  },
  description: "Medan Simpang adalah panduan heritage walk Kota Medan untuk menjelajahi Silalas, Sungai Deli, sejarah, kuliner, arsitektur, dan kehidupan kampung dari level mata.",
  alternates: { canonical: "https://urbanmorphsoc.com/medansimpang/" },
  keywords: ["Medan Simpang", "heritage walk Medan", "wisata sejarah Medan", "Silalas", "Sungai Deli", "jalan kaki Medan"],
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Medan Simpang — Seen at eye level",
    description: "Jelajahi Kota Medan dari level mata, selangkah demi selangkah.",
    url: "https://urbanmorphsoc.com/medansimpang",
    siteName: "Medan Simpang",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/images/silalas.webp", alt: "Medan Simpang heritage walk di kawasan Silalas" }],
  },
};

const medanSimpangStructuredData = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "@id": "https://urbanmorphsoc.com/medansimpang/#destination",
  name: "Medan Simpang",
  alternateName: "Medan Simpang — Seen at eye level",
  url: "https://urbanmorphsoc.com/medansimpang/",
  description: "Panduan heritage walk untuk membaca Kota Medan melalui kawasan, rute jalan kaki, arsitektur, kuliner, dan kehidupan masyarakat.",
  image: "https://urbanmorphsoc.com/images/silalas.webp",
  touristType: ["Wisata sejarah", "Heritage walk", "Wisata kota"],
  containedInPlace: {
    "@type": "City",
    name: "Medan",
  },
};

export default function MedanSimpangLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medanSimpangStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
