import { Layout } from "@/components/common/Layout";
import { apiUrl } from "@/data/config";
import "@/globals.css";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Providers } from "../contexts/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  // fetch post information
  const config = await fetch(`${apiUrl}/config/`).then((res) => res.json());

  return {
    title: config.kseoTitle,
    description: config.kseoDescription,
    keywords: config.kseoKeywords,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <Script
          strategy="afterInteractive"
          id="hotjar"
          src="https://t.contentsquare.net/uxa/99cd89445d8f6.js"
        />
        
        <Script
          strategy="afterInteractive"
          id="google1"
          src="https://www.googletagmanager.com/gtag/js?id=G-SKYYJNQ5ND"
        />
        <Script id="google2" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-SKYYJNQ5ND')`}
        </Script>
      </body>
    </html>
  );
}
