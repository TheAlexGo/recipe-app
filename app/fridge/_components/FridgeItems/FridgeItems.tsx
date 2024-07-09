'use client';

import { FC, JSX, useEffect } from 'react';

import { IProduct } from '@/actions/getProductByBarcode';
import { Chip } from '@/app/fridge/_components/Chip/Chip';
import { useFridge } from '@/hooks/useFridge';

interface IFridgeItems {
  initialItems: IProduct[];
}

export const FridgeItems: FC<IFridgeItems> = ({
  initialItems,
}): JSX.Element => {
  const { items, setItems } = useFridge();

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);

  return (
    <ul className="flex flex-col gap-y-3">
      {(items.length ? items : initialItems).map((product) => (
        <li key={product.code}>
          <Chip {...product} />
        </li>
      ))}
    </ul>
  );
};
