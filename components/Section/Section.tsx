import { FC, JSX, PropsWithChildren } from 'react';

interface ISection extends PropsWithChildren {}

export const Section: FC<ISection> = ({ children }): JSX.Element => {
  return <section className="flex flex-col gap-y-3">{children}</section>;
};
