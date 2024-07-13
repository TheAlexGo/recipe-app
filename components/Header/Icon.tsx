import { ButtonHTMLAttributes, FC, JSX, memo } from 'react';

import cn from 'classnames';
import { IconType } from 'react-icons';

interface IIcon
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'aria-label' | 'children'
  > {
  icon: IconType;
  label: string;
}

export const Icon: FC<IIcon> = memo(
  ({ icon: Icon, label, className, ...props }): JSX.Element => {
    return (
      <button
        {...props}
        className={cn('shrink-0', className)}
        type="button"
        aria-label={label}
      >
        <Icon className="size-6" />
      </button>
    );
  },
);

Icon.displayName = 'Header.Icon';
