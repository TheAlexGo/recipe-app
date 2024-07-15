import { FC, JSX, PropsWithChildren } from 'react';

interface IStackItem extends PropsWithChildren {}

export const StackItem: FC<IStackItem> = ({ children }): JSX.Element => {
  return <li>{children}</li>;
};
