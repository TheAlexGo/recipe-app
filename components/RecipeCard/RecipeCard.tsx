'use client';

import { FC, JSX, MouseEventHandler } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { TbCampfire, TbHeartPlus } from 'react-icons/tb';

import { IRecipe } from '@/actions/models/Recipe';
import { Detail } from '@/components/Detail/Detail';
import { DetailTime } from '@/components/Detail/DetailTime';
import { useLoadImage } from '@/hooks/useLoadImage';
import { getLocal } from '@/utils/local';

interface ICard
  extends Omit<
    IRecipe,
    'less_title' | 'description' | 'nutritions' | 'ingredients'
  > {
  small?: boolean;
  favorite?: boolean;
  onAddFavorite?: (recipeId: IRecipe['id']) => void;
  onRemoveFavorite?: (recipeId: IRecipe['id']) => void;
}

export const RecipeCard: FC<ICard> = ({
  id,
  cover_url: _cover_url,
  title,
  kcal,
  cooking_time,
  small,
  favorite,
  onAddFavorite,
  onRemoveFavorite,
}): JSX.Element => {
  const cover_url = useLoadImage('recipe_covers', _cover_url);

  const favoriteClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (favorite) {
      onRemoveFavorite?.(id);
    } else {
      onAddFavorite?.(id);
    }
  };

  const imageWidth = small ? 132 : 168;
  const imageHeight = small ? 88 : 128;

  return (
    <Link
      href={`recipe/${id}`}
      className="flex max-w-50 flex-col flex-wrap rounded-2xl p-4 shadow-card"
    >
      <div className={`relative h-[${imageHeight}px] w-[${imageWidth}px]`}>
        <button
          type="button"
          className={cn(
            'absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded',
            {
              'bg-white': !favorite,
              'bg-brand-secondary text-white': favorite,
            },
          )}
          aria-label={getLocal('actions.card.inFavorite')}
          onClickCapture={favoriteClickHandler}
        >
          <TbHeartPlus className="size-4" />
        </button>
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
