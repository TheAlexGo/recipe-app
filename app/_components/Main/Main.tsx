import { FC, JSX, PropsWithChildren } from 'react';

interface IMain extends PropsWithChildren {}

export const Main: FC<IMain> = ({ children }): JSX.Element => {
  return (
    <main className="flex min-h-full flex-1 flex-col px-6 py-3 pb-nav">
      {children}
    </main>
  );
};
