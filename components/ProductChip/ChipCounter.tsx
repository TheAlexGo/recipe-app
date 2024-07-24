import { FC, useCallback } from 'react';

import { Counter } from '@/components/Counter/Counter';
import { IProductDB } from '@/types/db';

import { AddHandler, RemoveHandler } from './types';

interface IChipCounter {
  count: number;
  product: IProductDB;
  onAdd: AddHandler;
  onRemove: RemoveHandler;
}

export const ChipCounter: FC<IChipCounter> = ({
  onAdd,
  onRemove,
  count,
  product,
}) => {
  const removeHandler = useCallback(() => {
    onRemove?.(product);
  }, [product, onRemove]);

  const addHandler = useCallback(() => {
    onAdd?.(product);
  }, [product, onAdd]);

  return <Counter value={count} onRemove={removeHandler} onAdd={addHandler} />;
};
