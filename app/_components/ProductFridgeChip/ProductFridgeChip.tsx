'use client';

import { FC, JSX, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { updateProductInFridge } from '@/actions/fridge';
import { ProductChip } from '@/components/ProductChip';
import { IProductChip } from '@/components/ProductChip/ProductChip';
import { IProductDB } from '@/types/db';
import { getLocal } from '@/utils/local';

interface IProductFridgeChip
  extends IProductDB,
    Pick<IProductChip, 'withoutClamp'> {
  count?: number;
}

export const ProductFridgeChip: FC<IProductFridgeChip> = ({
  ...product
}): JSX.Element => {
  const router = useRouter();

  const addHandler = useCallback(
    (productId: IProductDB['id']) => {
      updateProductInFridge(productId, product.count! + 1).then(() =>
        router.refresh(),
      );
    },
    [product.count, router],
  );

  const removeHandler = useCallback(
    (productId: IProductDB['id']) => {
      if (product.count === 1) {
        if (
          // eslint-disable-next-line no-alert
          !window.confirm(getLocal('delete.item.confirm'))
        ) {
          return;
        }
      }
      updateProductInFridge(productId, product.count! - 1).then(() =>
        router.refresh(),
      );
    },
    [product.count, router],
  );

  return (
    <ProductChip {...product} onAdd={addHandler} onRemove={removeHandler} />
  );
};
