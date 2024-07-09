import { FC, JSX, PropsWithChildren } from 'react';

import cn from 'classnames';

interface IHeader extends PropsWithChildren {
  className?: string;
}

export const Header: FC<IHeader> = ({ children, className }): JSX.Element => {
  return (
    <header
      className={cn(
        'sticky top-0 -mt-3 flex items-center justify-between gap-x-6 bg-white py-4',
        className,
      )}
    >
      {children}
    </header>
  );
};
