import { FC, JSX, memo, PropsWithChildren } from 'react';

interface ITitle extends PropsWithChildren {}

export const Title: FC<ITitle> = memo(({ children }): JSX.Element => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
});

Title.displayName = 'Header.Title';
