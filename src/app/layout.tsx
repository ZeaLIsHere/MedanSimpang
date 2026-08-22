import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Urban Morphology and Society",
  description: "Urban Morphology and Society (UMS) is a research cluster at Universitas Sumatera Utara studying how society shapes the built environment and, in turn, how the built environment shapes social life.",
  metadataBase: new URL("https://urbanmorphsoc.com"),
  icons: { icon: "/main-favicon.png" },
  openGraph: {
    title: "Urban Morphology and Society",
    description: "A research cluster studying the morphology of buildings, neighbourhoods, and cities — and its relationship with society.",
    url: "https://urbanmorphsoc.com",
    siteName: "Urban Morphology and Society",
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
        <CloudflareWebAnalytics />
      </body>
    </html>
  );
}

