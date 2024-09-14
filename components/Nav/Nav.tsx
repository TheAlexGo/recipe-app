import { FC, JSX, PropsWithChildren } from 'react';

import NavigationContainer from '@/public/assets/svg/icon_navigation-container.svg';

export interface INav extends PropsWithChildren {}

export const Nav: FC<INav> = ({ children }): JSX.Element => {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 mx-auto h-nav max-w-5xl">
      <div className="before:content after:content absolute inset-0 flex h-full text-white drop-shadow-nav before:h-full before:w-full before:rounded-tl-3xl before:bg-current after:h-full after:w-full after:rounded-tr-3xl after:bg-current">
        <NavigationContainer className="flex-shrink-0" />
      </div>
      <nav className="relative flex h-full w-full items-center justify-around">
        {children}
      </nav>
    </footer>
  );
};
