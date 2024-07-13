'use client';

import { FC, JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { TbCampfire, TbHeartPlus } from 'react-icons/tb';

import { IRecipe } from '@/actions/models/Recipe';
import { Detail } from '@/components/Detail/Detail';
import { DetailTime } from '@/components/Detail/DetailTime';
import { useLoadImage } from '@/hooks/useLoadImage';

interface ICard
  extends Omit<
    IRecipe,
    'less_title' | 'description' | 'nutritions' | 'ingredients'
  > {}

export const RecipeCard: FC<ICard> = ({
  id,
  cover_url: _cover_url,
  title,
  kcal,
  cooking_time,
}): JSX.Element => {
  const cover_url = useLoadImage('recipe_covers', _cover_url);
  return (
    <Link
      href={`recipe/${id}`}
      className="flex max-w-50 flex-col flex-wrap rounded-2xl p-4 shadow-card"
    >
      <div className="w-42 relative h-32">
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded bg-white"
          aria-label="В избранное"
        >
          <TbHeartPlus className="size-4" />
        </button>
        <Image
          className="h-full w-full rounded-2xl object-cover"
          src={cover_url}
          width={168}
          height={128}
          priority
          alt={`Обложка для ${title}`}
        />
      </div>
      <h3 className="mt-3 line-clamp-2 font-bold">{title}</h3>
      <div className="mt-1 flex items-center gap-x-2 text-sm text-neutral-gray-2">
        <Detail icon={TbCampfire}>{kcal} Ккал</Detail>
        <div className="h-1 w-1 rounded-full bg-current" />
        <DetailTime time={cooking_time} />
      </div>
    </Link>
  );
};
