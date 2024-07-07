'use client';

import { FC, JSX, useMemo } from 'react';

import cn from 'classnames';
import { LinkProps } from 'next/dist/client/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { FaHouse, FaRegUser, FaRegBell } from 'react-icons/fa6';
import { PiChefHat } from 'react-icons/pi';

interface IItem extends LinkProps {
  icon: 'home' | 'search' | 'notification' | 'profile' | 'chef';
  float?: boolean;
}

export const Item: FC<IItem> = ({ icon, float, ...props }): JSX.Element => {
  const pathname = usePathname();

  // eslint-disable-next-line consistent-return
  const IconComponent = useMemo(() => {
    // eslint-disable-next-line default-case
    switch (icon) {
      case 'home':
        return FaHouse;
      case 'search':
        return FaSearch;
      case 'notification':
        return FaRegBell;
      case 'profile':
        return FaRegUser;
      case 'chef':
        return PiChefHat;
    }
  }, [icon]);

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
    >
      <IconComponent className="h-6 w-6" />
    </Link>
  );
};
