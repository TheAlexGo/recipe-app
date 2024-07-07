import { FC, JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { TbCampfire, TbClock, TbHeartPlus } from 'react-icons/tb';

interface ICard {
  id: string;
  cover: string;
  title: string;
  kcal: number;
  cookingTime: number;
}

export const Card: FC<ICard> = ({
  id,
  cover,
  title,
  kcal,
  cookingTime,
}): JSX.Element => {
  return (
    <Link
      href={`recipe/${id}`}
      className="shadow-card max-w-50 flex flex-col flex-wrap rounded-2xl p-4"
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
          className="rounded-2xl"
          src={cover}
          fill
          priority
          alt={`Обложка для ${title}`}
        />
      </div>
      <h3 className="mt-3 font-bold">{title}</h3>
      <div className="mt-1 flex items-center gap-x-2 text-sm text-neutral-gray-2">
        <div className="flex items-center gap-x-1">
          <TbCampfire />
          {kcal} Ккал
        </div>
        <div className="h-1 w-1 rounded-full bg-current" />
        <div className="flex items-center gap-x-1">
          <TbClock />
          {cookingTime / 60} мин
        </div>
      </div>
    </Link>
  );
};
