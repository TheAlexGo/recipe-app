import { ButtonHTMLAttributes, FC, JSX } from 'react';

import cn from 'classnames';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  view?: 'primary' | 'danger';
  fill?: boolean;
}

export const Button: FC<IButton> = ({
  children,
  view = 'primary',
  fill = true,
  type,
  className,
  ...props
}): JSX.Element => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'flex items-center justify-center rounded-2xl p-4 font-bold',
        {
          'bg-brand-secondary text-white': view === 'primary',
          'bg-brand-danger text-white': view === 'danger',
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
