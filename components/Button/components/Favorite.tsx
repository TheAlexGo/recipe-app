'use client';

import { FC, JSX, MouseEvent } from 'react';

import NProgress from 'nprogress';
import { TbHeartPlus } from 'react-icons/tb';

import { addToFavorite, removeFromFavorite } from '@/actions/favorite';
import { getLocal } from '@/utils/local';
import { OmitOfUnion } from '@/utils/react';

import { Icon, IIcon } from './Icon';

type IFavorite = OmitOfUnion<IIcon, 'icon' | 'id'> & {
  id: number;
  favorite?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
};

export const Favorite: FC<IFavorite> = ({
  id,
  favorite,
  ...props
}): JSX.Element => {
  const favoriteClickHandler = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>,
  ) => {
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
      onClick={favoriteClickHandler}
      active={favorite}
    />
  );
};
