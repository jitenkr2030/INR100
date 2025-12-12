import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "INR100 - Micro Investing Platform | Start with ₹100",
    template: "%s | INR100"
  },
  description: "Start investing with just ₹100 in stocks, mutual funds, gold, and global assets. AI-powered insights, gamified learning, and expert guidance for beginners.",
  keywords: [
    "micro investing",
    "stock market",
    "mutual funds",
    "investment app",
    "India investing",
    "fractional investing",
    "AI investment insights",
    "beginner investing",
    "₹100 investment",
    "portfolio management"
  ],
  authors: [{ name: "INR100 Team" }],
  creator: "INR100",
  publisher: "INR100",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://inr100.com",
    title: "INR100 - Micro Investing Platform",
    description: "Start investing with just ₹100 in stocks, mutual funds, gold, and global assets. AI-powered insights and gamified learning.",
    siteName: "INR100",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "INR100 - Micro Investing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@inr100",
    creator: "@inr100",
    title: "INR100 - Micro Investing Platform",
    description: "Start investing with just ₹100 in stocks, mutual funds, gold, and global assets.",
    images: ["/twitter-card.svg"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "INR100",
    "application-name": "INR100",
    "msapplication-TileColor": "#3B82F6",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
