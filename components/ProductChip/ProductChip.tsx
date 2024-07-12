import { FC, JSX, useCallback } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import { IProduct } from '@/actions/getProductByBarcode';
import { Counter } from '@/components/Counter/Counter';

export interface IProductChip extends IProduct {
  count?: number;
  withoutClamp?: boolean;
  onRemove?: (productId: IProduct['id']) => void;
  onAdd?: (productId: IProduct['id']) => void;
}

export const ProductChip: FC<IProductChip> = ({
  id,
  title,
  imageUrl,
  withoutClamp,
  count,
  onRemove,
  onAdd,
}): JSX.Element => {
  const removeHandler = useCallback(() => {
    onRemove?.(id);
  }, [id, onRemove]);

  const addHandler = useCallback(() => {
    onAdd?.(id);
  }, [id, onAdd]);

  return (
    <article className="flex items-center justify-between gap-x-4 rounded-xl bg-white p-4 shadow-card">
      <div className="flex items-center gap-x-4">
        <div className="relative size-12 shrink-0">
          <Image className="object-contain" src={imageUrl} fill alt={title} />
        </div>
        <span
          className={cn('break-all text-lg font-bold', {
            'line-clamp-1': !withoutClamp,
            'line-clamp-none': withoutClamp,
          })}
        >
          {title}
        </span>
      </div>
      {Boolean(count) && (
        <Counter value={count!} onRemove={removeHandler} onAdd={addHandler} />
      )}
    </article>
  );
};
