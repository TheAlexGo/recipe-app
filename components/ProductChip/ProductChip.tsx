'use client';

import { FC, JSX, useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import { IProduct } from '@/actions/getProductByBarcode';
import { Counter } from '@/components/Counter/Counter';

export interface IProductChip extends IProduct {
  withoutClamp?: boolean;
}

export const ProductChip: FC<IProductChip> = ({
  title,
  imageUrl,
  count,
  withoutClamp,
}): JSX.Element => {
  const [value, setValue] = useState(count);

  const removeHandler = useCallback(() => {
    setValue((prevValue) => prevValue - 1);
  }, []);

  const addHandler = useCallback(() => {
    setValue((prevValue) => prevValue + 1);
  }, []);

  useEffect(() => {
    if (count !== undefined) {
      setValue(count);
    }
  }, [count]);

  return (
    <article className="flex items-center justify-between rounded-xl bg-white p-4 shadow-productChip">
      <div className="flex items-center gap-x-4">
        <div className="relative size-12 shrink-0">
          <Image className="object-contain" src={imageUrl} fill alt={title} />
        </div>
        <span
          className={cn('text-lg font-bold', {
            'line-clamp-1': !withoutClamp,
            'line-clamp-none': withoutClamp,
          })}
        >
          {title}
        </span>
      </div>
      {Number.isInteger(value) && (
        <Counter value={value} onRemove={removeHandler} onAdd={addHandler} />
      )}
    </article>
  );
};
