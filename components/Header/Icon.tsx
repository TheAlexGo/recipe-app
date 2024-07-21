import { FC, JSX, memo } from 'react';

import cn from 'classnames';
import { IconType } from 'react-icons';

import { Button } from '@/components/Button';
import { IButton } from '@/components/Button/Button';
import { OmitOfUnion } from '@/utils/react';

type IIcon = OmitOfUnion<
  IButton,
  'aria-label' | 'view' | 'fill' | 'children'
> & {
  icon: IconType;
  label: string;
};

export const Icon: FC<IIcon> = memo(
  ({ icon: Icon, label, className, ...props }): JSX.Element => {
    return (
      <Button
        {...props}
        view="custom"
        className={cn('shrink-0', className)}
        aria-label={label}
        fill={false}
      >
        <Icon className="size-6" />
      </Button>
    );
  },
);

Icon.displayName = 'Header.Icon';
