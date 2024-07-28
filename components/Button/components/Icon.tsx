import { forwardRef, JSX } from 'react';

import cn from 'classnames';
import { IconType } from 'react-icons';

import { Button, IButton } from '@/components/Button/Button';
import { OmitOfUnion } from '@/utils/react';

export type IIcon = OmitOfUnion<IButton, 'view'> & {
  icon: IconType;
  size: 'big' | 'small' | 'normal';
  withPadding?: boolean;
  active?: boolean;
};

export const Icon = forwardRef<HTMLButtonElement | HTMLAnchorElement, IIcon>(
  (
    {
      icon: Icon,
      size,
      className,
      active = false,
      withPadding = true,
      ...props
    },
    ref,
  ): JSX.Element => {
    const isBig = size === 'big';
    const isSmall = size === 'small';
    const isNormal = size === 'normal';
    return (
      <Button
        {...props}
        view="custom"
        className={cn(
          'flex items-center justify-center',
          {
            'bg-brand-secondary text-white': active,
            'bg-white': !active,
            'size-7 rounded': withPadding && isSmall,
            'size-10 rounded-xl': withPadding && isNormal,
            'size-13 rounded-xl': withPadding && isBig,
          },
          className,
        )}
        fill={false}
        ref={ref}
      >
        <Icon
          className={cn({
            'size-4': isSmall,
            'size-6': isNormal,
            'size-8': isBig,
          })}
        />
      </Button>
    );
  },
);

Icon.displayName = 'Button.Icon';
