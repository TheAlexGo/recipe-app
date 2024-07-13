import { FC, JSX, PropsWithChildren } from 'react';

import NavigationContainer from '@/public/assets/svg/icon_navigation-container.svg';

export interface INav extends PropsWithChildren {}

export const Nav: FC<INav> = ({ children }): JSX.Element => {
  return (
    <footer className="fixed bottom-0 h-nav w-full">
      <div className="before:content after:content absolute inset-0 flex h-full text-white drop-shadow-nav before:h-full before:w-full before:rounded-tl-3xl before:bg-current after:h-full after:w-full after:rounded-tr-3xl after:bg-current">
        <NavigationContainer className="flex-shrink-0" />
      </div>
      <nav className="relative z-10 flex h-full w-full items-center justify-around">
        {children}
      </nav>
    </footer>
  );
};
