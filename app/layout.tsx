import { ReactNode } from 'react';

import { Lato } from 'next/font/google';

import { Nav } from '@/app/_components/Nav';

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
    <html lang="ru">
      <body className={`${lato.className} text-neutral-dark`}>
        <main className="px-6 py-3">{children}</main>
        <Nav>
          <Nav.Item href="/" icon="home" />
          <Nav.Item href="/search" icon="search" />
          <Nav.Item href="/chef" icon="chef" float />
          <Nav.Item href="/notification" icon="notification" />
          <Nav.Item href="/profile" icon="profile" />
        </Nav>
      </body>
    </html>
  );
}
