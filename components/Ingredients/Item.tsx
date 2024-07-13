import { FC, JSX, PropsWithChildren } from 'react';

interface IItem extends PropsWithChildren {}

export const Item: FC<IItem> = ({ children }): JSX.Element => {
  return <li>{children}</li>;
};
