import { ReactNode } from 'react';

import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { Footer } from '@/app/_components/Footer/Footer';
import { ModalProvider } from '@/providers/ModalProvider';

import type { Metadata, Viewport } from 'next';

import './globals.css';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe Book',
  description: 'Приложения для хранения и получения рецептов',
  icons: [
    {
      rel: 'mask-icon',
      color: '#70B9BE',
      url: '/safari-pinned-tab.svg',
    },
  ],
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }],
  colorScheme: 'light',
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className="flex min-h-full flex-col">
      <body
        className={`${lato.className} flex flex-1 flex-col text-neutral-dark`}
      >
        <NextTopLoader color="#70B9BE" showSpinner={false} />
        <main className="flex min-h-full flex-1 flex-col px-6 py-3 pb-nav">
          {children}
        </main>
        <Footer />
        <ModalProvider />
      </body>
    </html>
  );
}
