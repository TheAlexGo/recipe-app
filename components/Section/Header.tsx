import { FC, JSX, PropsWithChildren } from 'react';

import Link from 'next/link';

import { getLocal } from '@/utils/local';

interface IHeader extends PropsWithChildren {
  moreLink?: string;
}

export const Header: FC<IHeader> = ({ children, moreLink }): JSX.Element => {
  return (
    <header className="flex items-start justify-between">
      <h2 className="text-xl font-bold text-neutral-dark">{children}</h2>
      {moreLink && (
        <Link
          className="text-sm font-bold text-brand-secondary"
          href={moreLink}
        >
          {getLocal('see.all')}
        </Link>
      )}
    </header>
  );
};
