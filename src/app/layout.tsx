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
  title: "UrbanMorphSoc — Seeing cities at eye level",
  description: "UrbanMorphSoc adalah wadah bagi project-project urban: heritage walk, riset, dan cerita kota. Melihat kota dari level mata.",
  metadataBase: new URL("https://urbanmorphsoc.com"),
  openGraph: {
    title: "UrbanMorphSoc — Seeing cities at eye level",
    description: "Wadah project-project urban: heritage walk, riset, dan cerita kota.",
    url: "https://urbanmorphsoc.com",
    siteName: "UrbanMorphSoc",
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

