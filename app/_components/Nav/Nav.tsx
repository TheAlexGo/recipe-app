import { FC, JSX, PropsWithChildren } from 'react';

import NavigationContainer from '@/public/icon_navigation-container.svg';

export interface INav extends PropsWithChildren {}

export const Nav: FC<INav> = ({ children }): JSX.Element => {
  return (
    <footer className="h-nav fixed bottom-0 w-full">
      <div className="before:content after:content drop-shadow-nav absolute inset-0 flex h-full text-white before:h-full before:w-full before:rounded-tl-3xl before:bg-current after:h-full after:w-full after:rounded-tr-3xl after:bg-current">
        <NavigationContainer className="flex-shrink-0" />
      </div>
      <nav className="relative z-10 flex h-full w-full items-center justify-around">
        {children}
      </nav>
    </footer>
  );
};
