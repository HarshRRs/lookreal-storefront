import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { SITE_NAME, DEFAULT_SEO } from "@/lib/utils/constants";
import { CartProvider } from "@/lib/context/CartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: DEFAULT_SEO.title,
  description: DEFAULT_SEO.description,
  keywords: DEFAULT_SEO.keywords,
  openGraph: {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <CartProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0B0B0B',
                color: '#fff',
                borderRadius: '1rem',
                padding: '1rem 1.5rem',
              },
            }}
          />
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
