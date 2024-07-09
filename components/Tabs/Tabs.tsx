import { FC, JSX, PropsWithChildren } from 'react';

import cn from 'classnames';

import { IProvider, Provider } from './Provider';

interface ITabs extends PropsWithChildren, IProvider {
  label: string;
  className?: string;
}

export const Tabs: FC<ITabs> = ({
  children,
  className,
  label,
  ...providerProps
}): JSX.Element => {
  return (
    <Provider {...providerProps}>
      <div
        role="tablist"
        className={cn('flex rounded-2xl bg-neutral-gray-4 p-1', className)}
        aria-label={label}
      >
        {children}
      </div>
    </Provider>
  );
};
