'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';

import { addProductInFridge, removeProductFromFridge } from '@/actions/fridge';
import {
  IProductChip,
  ProductChip,
} from '@/components/ProductChip/ProductChip';
import { IProductDB, IProductDBInFridge } from '@/types/db';
import { getLocal } from '@/utils/local';

interface IChip extends IProductDB, Pick<IProductChip, 'withoutClamp'> {
  inFridge?: IProductDBInFridge['inFridge'];
}

export const Chip: FC<IChip> = ({ inFridge = [], ...product }): JSX.Element => {
  const router = useRouter();

  const addHandler = (productId: IProductDB['id']) => {
    addProductInFridge(productId).then(() => router.refresh());
  };

  const removeHandler = () => {
    if (inFridge.length === 1) {
      if (
        // eslint-disable-next-line no-alert
        !window.confirm(getLocal('delete.item.confirm'))
      ) {
        return;
      }
    }
    removeProductFromFridge(inFridge[0].id).then(() => router.refresh());
  };

  return (
    <ProductChip
      {...product}
      onAdd={addHandler}
      onRemove={removeHandler}
      count={inFridge.length}
    />
  );
};
