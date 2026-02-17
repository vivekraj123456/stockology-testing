import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Providers } from "./providers";
import StructuredData from "./Components/StructuredData";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stockology.in'),
  title: {
    default: "Stockology - Best Stock Broker in India | Zero Brokerage Trading",
    template: "%s | Stockology"
  },
  description: "Stockology offers India's best stock broking services with zero brokerage charges. Open free demat account, trade in equity, F&O, mutual funds, IPO investments with lowest charges.",
  keywords: [
    "stock broker India",
    "zero brokerage",
    "demat account",
    "online trading",
    "stock market",
    "mutual funds",
    "IPO investment",
    "equity trading",
    "stockology",
    "best broker India",
    "free demat account",
    "NSE broker",
    "stock trading app"
  ],
  authors: [{ name: "Stockology Securities Private Limited" }],
  creator: "Stockology",
  publisher: "Stockology Securities Private Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/apple-touch-icon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://stockology.in',
    siteName: 'Stockology',
    title: 'Stockology - Best Stock Broker in India | Zero Brokerage Trading',
    description: 'Open free demat account with Stockology. Trade in stocks, mutual funds, IPO with zero brokerage charges. NSE registered broker with lowest trading fees.',
    images: [
      {
        url: '/stklogo.png',
        width: 1200,
        height: 630,
        alt: 'Stockology - Stock Broking Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stockology - Best Stock Broker in India',
    description: 'Open free demat account. Zero brokerage trading in stocks, mutual funds, IPO investments.',
    images: ['/stklogo.png'],
    creator: '@stockology',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="canonical" href="https://stockology.in" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-20 min-h-screen flex flex-col`}
      >
        <StructuredData />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
