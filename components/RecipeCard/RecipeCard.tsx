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
    'less_title' | 'description' | 'nutritions' | 'ingredients'
  > {
  small?: boolean;
  favorite?: boolean;
  showFavorite?: boolean;
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
}): JSX.Element => {
  const cover_url = useLoadImage('recipe_covers', _cover_url);

  const imageWidth = small ? 132 : 168;
  const imageHeight = small ? 88 : 128;

  return (
    <Link
      href={`/recipe/${id}`}
      className={cn(
        'flex max-w-50 flex-col flex-wrap rounded-2xl shadow-card',
        {
          'p-3': small,
          'p-4': !small,
        },
      )}
    >
      <div
        className={cn('relative', {
          'h-productCardSmall w-productCardSmall': small,
          'h-productCardBig w-productCardBig': !small,
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
          className="h-full w-full rounded-2xl object-cover"
          src={cover_url}
          width={imageWidth}
          height={imageHeight}
          priority
          alt={`Обложка для ${title}`}
        />
      </div>
      <h3 className="mt-3 line-clamp-2 font-bold">{title}</h3>
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
