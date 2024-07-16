'use client';

import { FC, JSX, MouseEventHandler } from 'react';

import NProgress from 'nprogress';
import { TbHeartPlus } from 'react-icons/tb';

import { addToFavorite, removeFromFavorite } from '@/actions/impl/favorite';
import { getLocal } from '@/utils/local';

import { Icon, IIcon } from './Icon';

interface IFavorite extends Omit<IIcon, 'id' | 'icon'> {
  id: number;
  favorite?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
}

export const Favorite: FC<IFavorite> = ({
  id,
  favorite,
  ...props
}): JSX.Element => {
  const favoriteClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    NProgress.start();
    if (favorite) {
      removeFromFavorite(id);
    } else {
      addToFavorite(id);
    }
  };

  return (
    <Icon
      {...props}
      icon={TbHeartPlus}
      aria-label={getLocal('actions.card.inFavorite')}
      onClickCapture={favoriteClickHandler}
      active={favorite}
    />
  );
};
