'use client';

import { FC, JSX, useCallback } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import { Button } from '@/components/Button';
import { Counter } from '@/components/Counter/Counter';
import { useLoadImage } from '@/hooks/useLoadImage';
import { useProductModal } from '@/hooks/useProductModal';
import { IProductDB } from '@/types/db';

export interface IProductChip extends IProductDB {
  count?: number;
  withoutClamp?: boolean;
  onRemove?: (productId: IProductDB['id']) => void;
  onAdd?: (productId: IProductDB['id']) => void;
}

export const ProductChip: FC<IProductChip> = ({
  withoutClamp,
  count,
  onRemove,
  onAdd,
  ...product
}): JSX.Element => {
  const { id, title, image_url: _image_url } = product;
  const image_url = useLoadImage('product_images', _image_url);
  const { onOpen } = useProductModal();

  const clickHandler = useCallback(() => {
    onOpen({ ...product, image_url });
  }, [image_url, onOpen, product]);

  const removeHandler = useCallback(() => {
    onRemove?.(id);
  }, [id, onRemove]);

  const addHandler = useCallback(() => {
    onAdd?.(id);
  }, [id, onAdd]);

  return (
    <article className="flex items-center justify-between gap-x-4 rounded-xl bg-white p-4 shadow-card">
      <Button
        view="custom"
        className="flex items-center gap-x-4"
        onClick={clickHandler}
      >
        <div className="flex shrink-0 items-center justify-center rounded-lg bg-neutral-gray-4 p-2">
          <Image
            className="size-8 object-contain"
            src={image_url}
            width={32}
            height={32}
            alt=""
            aria-hidden
          />
        </div>
        <span
          className={cn('break-all text-lg font-bold', {
            'line-clamp-1': !withoutClamp,
            'line-clamp-none': withoutClamp,
          })}
        >
          {title}
        </span>
      </Button>
      {typeof count !== 'undefined' && (
        <Counter value={count!} onRemove={removeHandler} onAdd={addHandler} />
      )}
    </article>
  );
};
