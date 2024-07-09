import { FC, JSX, useCallback, useState } from 'react';

import Image from 'next/image';

import { IProduct } from '@/actions/getProductByBarcode';
import { Counter } from '@/components/Counter/Counter';

interface IProductChip extends IProduct {}

export const ProductChip: FC<IProductChip> = ({
  title,
  imageUrl,
}): JSX.Element => {
  const [value, setValue] = useState(0);

  const removeHandler = useCallback(() => {
    setValue((prevValue) => prevValue - 1);
  }, []);

  const addHandler = useCallback(() => {
    setValue((prevValue) => prevValue + 1);
  }, []);

  return (
    <article className="flex items-center rounded-xl p-4 shadow-productChip">
      <div className="flex items-center gap-x-4">
        <div className="relative size-12 shrink-0">
          <Image className="object-contain" src={imageUrl} fill alt={title} />
        </div>
        <span className="line-clamp-1 text-lg font-bold">{title}</span>
      </div>
      <Counter value={value} onRemove={removeHandler} onAdd={addHandler} />
    </article>
  );
};
