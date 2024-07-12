'use client';

import { FC, JSX } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';

import { useLoadImage } from '@/hooks/useLoadImage';

interface IUserCard {
  firstname: string;
  lastname: string;
  userRole: string;
  avatar?: string;
  className?: string;
}

export const UserCard: FC<IUserCard> = ({
  avatar,
  firstname,
  lastname,
  userRole,
  className,
}): JSX.Element => {
  const avatarSrc = useLoadImage('user_avatars', avatar);
  return (
    <article
      className={cn(
        'flex items-center justify-between gap-x-4 rounded-2xl bg-white p-4 shadow-card',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-x-4">
        <Image
          className="size-12 shrink-0 rounded-full border border-brand-secondary object-cover"
          width={48}
          height={48}
          src={avatarSrc}
          priority
          alt="Аватарка"
        />
        <div className="flex flex-col gap-y-0.5">
          <h1 className="text-lg font-bold">
            {firstname} {lastname}
          </h1>
          <p className="text-sm">{userRole}</p>
        </div>
      </div>
      <div className="rounded-lg bg-neutral-dark p-1.5 text-white">
        <FaArrowRight className="size-4" />
      </div>
    </article>
  );
};
