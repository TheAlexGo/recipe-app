import { ReactNode } from 'react';

import { Lato } from 'next/font/google';

import { Footer } from '@/app/_components/Footer/Footer';
import { ModalProvider } from '@/providers/ModalProvider';

import type { Metadata } from 'next';

import './globals.css';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'Приложение для сбора и оценки рецептов',
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
        <main className="flex min-h-full flex-1 flex-col px-6 py-3 pb-nav">
          {children}
        </main>
        <Footer />
        <ModalProvider />
      </body>
    </html>
  );
}
