import { FC, JSX, PropsWithChildren } from 'react';

import { ScrollItem } from '@/components/Section/ScrollItem';

interface IScroll extends PropsWithChildren {}

const Core: FC<IScroll> = ({ children }): JSX.Element => {
  return (
    <ul className="scrollbar-hide -m-4 flex snap-x flex-nowrap gap-x-3 overflow-scroll scroll-auto p-4">
      {children}
    </ul>
  );
};

export const Scroll = Object.assign(Core, {
  Item: ScrollItem,
});
