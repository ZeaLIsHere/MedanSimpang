import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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

export const metadata: Metadata = {
  title: "Medan Simpang — Seen at eye level",
  description: "Platform city-guide & heritage-walk mandiri di Kota Medan. Jelajahi gang-gang kecil, sejarah, kuliner, dan arsitektur bersejarah dari level mata.",
  metadataBase: new URL("https://medansimpang.com"),
  openGraph: {
    title: "Medan Simpang — Seen at eye level",
    description: "Jelajahi Kota Medan dari level mata, selangkah demi selangkah.",
    url: "https://medansimpang.com",
    siteName: "Medan Simpang",
    locale: "id_ID",
    type: "website",
  },
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
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

