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
    <html lang="ru" className="max-h-full">
      <body className={`${lato.className} max-h-full text-neutral-dark`}>
        <main className="max-h-full px-6 py-3 pb-nav">{children}</main>
        <Footer />
        <ModalProvider />
      </body>
    </html>
  );
}
