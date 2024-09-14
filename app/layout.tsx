import { ReactNode } from 'react';

import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className="flex min-h-full flex-col">
      <body
        className={`${lato.className} m-auto flex w-full max-w-5xl flex-1 flex-col text-neutral-dark`}
      >
        <NextTopLoader color="#70B9BE" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
