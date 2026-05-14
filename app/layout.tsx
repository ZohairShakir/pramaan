import { Inter, Outfit, Cormorant_Garamond, Rozha_One } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const rozha = Rozha_One({
  variable: "--font-rozha",
  subsets: ["latin", "devanagari"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Pramaan | Institutional Trust Infrastructure",
  description: "Digital trust infrastructure for institutions. Anchor, verify, and manage documents with blockchain-backed authenticity. Trust should take seconds, not emails.",
};

import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} ${cormorant.variable} ${rozha.variable} font-sans halftone`}>
        <Providers>
          <Navbar />
          {children}
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
