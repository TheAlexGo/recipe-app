import { FC, useCallback } from 'react';

import { CiSquareMinus } from 'react-icons/ci';

import { Button } from '@/components/Button';
import { IProductDB } from '@/types/db';
import { getLocal } from '@/utils/local';

import { RemoveHandler } from './types';

interface IChipRemoveButton {
  product: IProductDB;
  onRemove: RemoveHandler;
}

export const ChipRemoveButton: FC<IChipRemoveButton> = ({
  onRemove,
  product,
}) => {
  const removeHandler = useCallback(() => {
    onRemove(product);
  }, [onRemove, product]);

  return (
    <Button.Icon
      className="shrink-0 text-brand-secondary"
      icon={CiSquareMinus}
      size="normal"
      onClick={removeHandler}
      aria-label={getLocal('actions.remove')}
      withPadding={false}
    />
  );
};
