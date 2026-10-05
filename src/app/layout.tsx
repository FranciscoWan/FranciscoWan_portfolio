import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SITE_CONFIG } from '@/core/config/site.config';
import { Footer, Header } from '@/layout';
import { cn } from '@/shared/lib/cn';
import '@/styles/globals.css';
import { displayFont, monoFont, sansFont } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.role}`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.contact.linkedinUrl }],
  alternates: { canonical: '/' },
  icons: {
    icon: { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    apple: { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: '/',
    siteName: SITE_CONFIG.shortName,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#131212',
  colorScheme: 'dark',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={cn(displayFont.variable, sansFont.variable, monoFont.variable)}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
