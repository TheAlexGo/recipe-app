'use client';

import { FC, JSX, memo, useMemo } from 'react';

import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

import { Button } from '@/components/Button';
import { IButton } from '@/components/Button/Button';

export type INavItem = IButton & {
  icon: IconType;
  label: string;
  float?: boolean;
};

export const Item: FC<INavItem> = memo(
  ({ icon: Icon, float, label, ...props }): JSX.Element => {
    const pathname = usePathname();

    const isActiveUrl = useMemo(() => {
      if (!props.href) {
        return false;
      }
      if (props.href === '/') {
        return pathname === props.href;
      }
      return pathname.startsWith(props.href);
    }, [props.href, pathname]);

    return (
      <Button
        {...props}
        view="custom"
        className={cn(
          isActiveUrl ? 'text-brand-secondary' : 'text-neutral-gray-2',
          float
            ? 'absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 translate-y-[calc(-50%_-_4px)] transform items-center justify-center rounded-full bg-cyan-950 text-white'
            : 'flex w-full justify-center py-3',
        )}
        aria-label={label}
      >
        <Icon className="h-6 w-6" />
      </Button>
    );
  },
);

Item.displayName = 'Nav.Item';
