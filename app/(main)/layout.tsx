import { ReactNode } from 'react';

import { Footer } from '@/app/_components/Footer/Footer';
import { Main } from '@/app/_components/Main/Main';
import { ModalProvider } from '@/providers/ModalProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Main>{children}</Main>
      <div className="relative">
        <Footer />
      </div>
      <ModalProvider />
    </>
  );
}
