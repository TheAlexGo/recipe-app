'use client';

import { FC, JSX } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { TbCampfire } from 'react-icons/tb';

import { IRecipe } from '@/actions/models/Recipe';
import { Button } from '@/components/Button';
import { Detail } from '@/components/Detail/Detail';
import { DetailTime } from '@/components/Detail/DetailTime';
import { useLoadImage } from '@/hooks/useLoadImage';

interface ICard
  extends Omit<
    IRecipe,
    'less_title' | 'description' | 'nutritions' | 'ingredients' | 'steps'
  > {
  small?: boolean;
  favorite?: boolean;
  showFavorite?: boolean;
  fixedWidth?: boolean;
}

export const RecipeCard: FC<ICard> = ({
  id,
  cover_url: _cover_url,
  title,
  kcal,
  cooking_time,
  small,
  favorite,
  showFavorite = true,
  fixedWidth = false,
}): JSX.Element => {
  const cover_url = useLoadImage('recipe_covers', _cover_url);

  return (
    <Link
      href={`/recipe/${id}`}
      className={cn('flex h-full flex-col flex-wrap rounded-2xl shadow-card', {
        'w-52': fixedWidth,
        'p-3': small,
        'p-4': !small,
        'h-productCardSmall': small,
        'h-productCardBig': !small,
      })}
    >
      <div
        className={cn('relative', {
          'h-productCardSmallImage': small,
          'h-productCardBigImage': !small,
        })}
      >
        {showFavorite && (
          <Button.Favorite
            id={id}
            size="small"
            className="absolute right-3 top-3 z-10"
            favorite={favorite}
          />
        )}
        <Image
          className="rounded-2xl object-cover"
          src={cover_url}
          priority
          fill
          sizes="176px"
          alt={`Обложка для ${title}`}
        />
      </div>
      <h3 className="mt-3 line-clamp-2 flex-1 font-bold">{title}</h3>
      {!small && (
        <div className="mt-1 flex items-center gap-x-2 text-sm text-neutral-gray-2">
          <Detail icon={TbCampfire}>{kcal} Ккал</Detail>
          <div className="h-1 w-1 rounded-full bg-current" />
          <DetailTime time={cooking_time} />
        </div>
      )}
    </Link>
  );
};
