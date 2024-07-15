import { FC, JSX, PropsWithChildren } from 'react';

import { StackItem } from '@/components/Section/StackItem';

interface IStack extends PropsWithChildren {}

const Core: FC<IStack> = ({ children }): JSX.Element => {
  return <ul className="grid grid-cols-2 gap-4">{children}</ul>;
};

export const Stack = Object.assign(Core, {
  Item: StackItem,
});
