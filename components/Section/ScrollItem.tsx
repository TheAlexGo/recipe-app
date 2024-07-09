import { FC, JSX, PropsWithChildren } from 'react';

interface IScrollItem extends PropsWithChildren {}

export const ScrollItem: FC<IScrollItem> = ({ children }): JSX.Element => {
  return <li className="flex-shrink-0 snap-center">{children}</li>;
};
