'use client';

import { FC, JSX } from 'react';

import { Chip } from '@/app/fridge/_components/Chip/Chip';
import { useFridge } from '@/hooks/useFridge';

interface IFridgeItems {}

export const FridgeItems: FC<IFridgeItems> = (): JSX.Element => {
  const { items } = useFridge();
  return (
    <ul className="flex flex-col gap-y-3">
      {items.map((product) => (
        <li key={product.code}>
          <Chip {...product} />
        </li>
      ))}
    </ul>
  );
};
