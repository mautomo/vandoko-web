import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ClientProvider from "@/components/ClientProvider";
import HulyInspiredBackground from "@/components/HulyInspiredBackground";


const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO and browser tab
export const metadata: Metadata = {
  title: "Vandoko - Revolutionary Automotive Intelligence",
  description: "AI-powered market intelligence that turns pressure into dominance",
  authors: [{ name: "Donovan + Dynko" }],
  keywords: ["automotive", "intelligence", "AI", "dealers", "market analysis"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white min-h-screen relative`}>
        {/* Background layer - stays behind everything */}
        <HulyInspiredBackground />
        
        {/* Client provider wraps all interactive content */}
        <ClientProvider>
          {/* Main content layer - above background */}
          <div className="relative z-10">
            <Navigation />
            <main className="relative">
              {children}
            </main>
          </div>
        </ClientProvider>
        
        {/* Hidden signature for Mike & Mike */}
        <div className="hidden" aria-hidden="true">
          Built with competitive fire by Mike Donovan & Mike Dynko.
          Two friends. One vision. Vandoko.
        </div>
      </body>
    </html>
  );
}