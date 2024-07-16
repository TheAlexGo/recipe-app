import { FC, JSX } from 'react';

import cn from 'classnames';
import { IconType } from 'react-icons';

import { Button, IButton } from '@/components/Button/Button';

export interface IIcon extends Omit<IButton, 'view' | 'type'> {
  icon: IconType;
  size: 'small' | 'normal';
  active?: boolean;
}

export const Icon: FC<IIcon> = ({
  icon: Icon,
  size,
  className,
  active = false,
  ...props
}): JSX.Element => {
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
          'size-7 rounded': isSmall,
          'size-10 rounded-xl': isNormal,
        },
        className,
      )}
      type="button"
      fill={false}
    >
      <Icon
        className={cn({
          'size-4': isSmall,
          'size-6': isNormal,
        })}
      />
    </Button>
  );
};
