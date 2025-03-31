import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "highlight.js/styles/atom-one-dark.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryan's Portfolio",
  description: "Software developer portfolio showcasing projects and skills",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-gray-900 relative`}
      >
        {/* Background subtle pattern */}
        <div className="fixed inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />

        {/* Background gradient */}
        <div className="fixed top-[-50%] right-[-50%] w-[100%] h-[100%] rounded-full bg-gradient-to-br from-blue-50 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent blur-3xl opacity-50 pointer-events-none" />
        <div className="fixed bottom-[-50%] left-[-50%] w-[100%] h-[100%] rounded-full bg-gradient-to-tr from-purple-50 via-transparent to-transparent dark:from-purple-950/20 dark:via-transparent dark:to-transparent blur-3xl opacity-50 pointer-events-none" />

        <Navbar />

        <main className="flex-grow flex flex-col relative z-0">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
