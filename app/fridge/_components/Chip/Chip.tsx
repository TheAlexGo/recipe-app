'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';

import {
  updateProductInFridge,
  removeProductFromFridge,
} from '@/actions/fridge';
import {
  IProductChip,
  ProductChip,
} from '@/components/ProductChip/ProductChip';
import { IProductDB } from '@/types/db';
import { getLocal } from '@/utils/local';

interface IChip extends IProductDB, Pick<IProductChip, 'withoutClamp'> {
  count: number;
}

export const Chip: FC<IChip> = ({ ...product }): JSX.Element => {
  const router = useRouter();

  const addHandler = (productId: IProductDB['id']) => {
    updateProductInFridge(productId, product.count + 1).then(() =>
      router.refresh(),
    );
  };

  const removeHandler = (productId: IProductDB['id']) => {
    if (product.count === 1) {
      if (
        // eslint-disable-next-line no-alert
        !window.confirm(getLocal('delete.item.confirm'))
      ) {
        return;
      }
    }
    updateProductInFridge(productId, product.count - 1).then(() =>
      router.refresh(),
    );
  };

  return (
    <ProductChip {...product} onAdd={addHandler} onRemove={removeHandler} />
  );
};
