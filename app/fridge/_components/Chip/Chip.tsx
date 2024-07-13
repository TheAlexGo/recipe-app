'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';

import { addProduct, removeProduct } from '@/actions/fridge';
import { IProductApi, IProductDB } from '@/actions/getProductByBarcode';
import {
  IProductChip,
  ProductChip,
} from '@/components/ProductChip/ProductChip';

interface IChip extends IProductApi, Pick<IProductChip, 'withoutClamp'> {
  inFridge?: IProductDB['inFridge'];
}

export const Chip: FC<IChip> = ({ inFridge = [], ...product }): JSX.Element => {
  const router = useRouter();

  const addHandler = (productId: IProductDB['id']) => {
    addProduct(productId).then(() => router.refresh());
  };

  const removeHandler = () => {
    if (inFridge.length === 1) {
      if (
        // eslint-disable-next-line no-alert
        !window.confirm(
          'После удаления последнего товара, он пропадёт из холодильника. Продолжить?',
        )
      ) {
        return;
      }
    }
    removeProduct(inFridge[0].id).then(() => router.refresh());
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
