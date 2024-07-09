'use client';

import { FC, JSX, memo } from 'react';

import cn from 'classnames';
import { LinkProps } from 'next/dist/client/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

export interface INavItem extends Omit<LinkProps, 'href'> {
  href: string;
  icon: IconType;
  label: string;
  float?: boolean;
}

export const Item: FC<INavItem> = memo(
  ({ icon: Icon, float, label, ...props }): JSX.Element => {
    const pathname = usePathname();

    return (
      <Link
        {...props}
        className={cn(
          pathname === props.href
            ? 'text-brand-secondary'
            : 'text-neutral-gray-2',
          float
            ? 'absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 translate-y-[calc(-50%_-_4px)] transform items-center justify-center rounded-full bg-cyan-950 text-white'
            : 'flex w-full justify-center py-3',
        )}
        aria-label={label}
      >
        <Icon className="h-6 w-6" />
      </Link>
    );
  },
);

Item.displayName = 'Nav.Item';
