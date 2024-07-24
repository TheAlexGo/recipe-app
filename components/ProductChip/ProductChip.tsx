'use client';

import { FC, JSX, PropsWithChildren, useCallback } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import { Button } from '@/components/Button';
import { useLoadImage } from '@/hooks/useLoadImage';
import { useProductModal } from '@/hooks/useProductModal';
import { IProductDB } from '@/types/db';

export interface IProductChip extends PropsWithChildren {
  product: IProductDB;
  withoutClamp?: boolean;
}

export const ProductChip: FC<IProductChip> = ({
  withoutClamp,
  children,
  ...props
}): JSX.Element => {
  const { product } = props;
  const { title, image_url: _image_url } = product;
  const image_url = useLoadImage('product_images', _image_url);
  const { onOpen } = useProductModal();

  const clickHandler = useCallback(() => {
    onOpen(product);
  }, [product, onOpen]);

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
          className={cn('break-all text-left text-lg font-bold', {
            'line-clamp-1': !withoutClamp,
            'line-clamp-none': withoutClamp,
          })}
        >
          {title}
        </span>
      </Button>
      {children}
    </article>
  );
};
