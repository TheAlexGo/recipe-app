import { ButtonHTMLAttributes, FC, JSX } from 'react';

import cn from 'classnames';

interface ILink extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Link: FC<ILink> = ({ children, ...props }): JSX.Element => {
  return (
    <button
      {...props}
      type="button"
      className={cn('font-bold text-brand-secondary')}
    >
      {children}
    </button>
  );
};
