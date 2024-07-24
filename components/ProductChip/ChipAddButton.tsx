import { FC, useCallback } from 'react';

import { CiSquarePlus } from 'react-icons/ci';

import { Button } from '@/components/Button';
import { IProductDB } from '@/types/db';
import { getLocal } from '@/utils/local';

import { AddHandler } from './types';

interface IChipAddButton {
  product: IProductDB;
  onAdd: AddHandler;
}

export const ChipAddButton: FC<IChipAddButton> = ({ onAdd, product }) => {
  const addHandler = useCallback(() => {
    onAdd(product);
  }, [onAdd, product]);

  return (
    <Button.Icon
      className="shrink-0 text-brand-secondary"
      icon={CiSquarePlus}
      size="normal"
      onClick={addHandler}
      aria-label={getLocal('actions.add')}
      withPadding={false}
    />
  );
};
