import { ButtonHTMLAttributes, FC, JSX } from 'react';

import cn from 'classnames';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  view?: 'primary';
  fill?: boolean;
}

export const Button: FC<IButton> = ({
  children,
  view = 'primary',
  fill = true,
  className,
  ...props
}): JSX.Element => {
  return (
    <button
      {...props}
      className={cn(
        'flex items-center justify-center rounded-2xl p-4',
        {
          'bg-brand-secondary font-bold text-white': view === 'primary',
          'w-full': fill,
          'opacity-70': props.disabled,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};
