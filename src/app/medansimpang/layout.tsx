import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medan Simpang — Seen at eye level",
  description: "Platform city-guide & heritage-walk mandiri di Kota Medan. Jelajahi gang-gang kecil, sejarah, kuliner, dan arsitektur bersejarah dari level mata.",
  metadataBase: new URL("https://urbanmorphsoc.com/medansimpang"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Medan Simpang — Seen at eye level",
    description: "Jelajahi Kota Medan dari level mata, selangkah demi selangkah.",
    url: "https://urbanmorphsoc.com/medansimpang",
    siteName: "Medan Simpang",
    locale: "id_ID",
    type: "website",
  },
};

export default function MedanSimpangLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
