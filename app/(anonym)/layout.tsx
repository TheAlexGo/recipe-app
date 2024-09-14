import { ReactNode } from 'react';

import { Main } from '@/app/_components/Main/Main';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Main>{children}</Main>;
}
