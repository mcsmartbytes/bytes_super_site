import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MC Smart Bytes | Professional Business Solutions",
  description: "Expert bookkeeping, Excel solutions, database conversion, and custom consulting services. Transform your business operations with MC Smart Bytes.",
  keywords: [
    "bookkeeping services",
    "excel solutions",
    "database conversion",
    "business consulting",
    "financial services",
    "data management",
    "business automation",
    "custom consulting"
  ],
  authors: [{ name: "MC Smart Bytes" }],
  creator: "MC Smart Bytes",
  publisher: "MC Smart Bytes",
  metadataBase: new URL('https://bytes-super-site-8zwz.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MC Smart Bytes | Professional Business Solutions",
    description: "Expert bookkeeping, Excel solutions, database conversion, and custom consulting services. Transform your business operations with MC Smart Bytes.",
    url: 'https://bytes-super-site-8zwz.vercel.app',
    siteName: "MC Smart Bytes",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MC Smart Bytes | Professional Business Solutions",
    description: "Expert bookkeeping, Excel solutions, database conversion, and custom consulting services.",
    creator: '@mcsmartbytes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
