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
    Pick<IProductChip, 'withClamp'> {
  count: number;
}

export const ProductFridgeChip: FC<IProductFridgeChip> = ({
  ...product
}): JSX.Element => {
  const router = useRouter();
  const { count, ...productData } = product;

  const addHandler = useCallback(
    ({ id }: IProductDB) => {
      updateProductInFridge(id, product.count! + 1).then(() =>
        router.refresh(),
      );
    },
    [product.count, router],
  );

  const removeHandler = useCallback(
    ({ id }: IProductDB) => {
      if (product.count === 1) {
        if (
          // eslint-disable-next-line no-alert
          !window.confirm(getLocal('delete.item.confirm'))
        ) {
          return;
        }
      }
      updateProductInFridge(id, product.count! - 1).then(() =>
        router.refresh(),
      );
    },
    [product.count, router],
  );

  return (
    <ProductChip product={productData}>
      <ProductChip.Counter
        count={count}
        product={productData}
        onAdd={addHandler}
        onRemove={removeHandler}
      />
    </ProductChip>
  );
};
