import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Sidebar from "../src/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/layout/Banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tools.thetrinityweb.com.br'), // TODO: Change to production URL
  title: "TW Tools - Ferramentas Online Gratuitas",
  description: 'Somos uma plataforma de ferramentas online para você criar, validar e gerar dados de forma rápida e fácil.',
  openGraph: {
    images: [
      {
        url: "/assets/ogimage.jpg",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full bg-gray-50">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <div className="min-h-screen">
          <Sidebar />
          <main className="lg:pl-72">
            <Banner />
            <div className="px-4 sm:px-6 lg:px-8 pt-10">
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </body>
      <GoogleAnalytics gaId={"G-NED7NYFGB1"} />
    </html>
  );
}
