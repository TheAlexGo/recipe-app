'use client';

import { FC, JSX } from 'react';

import {
  IProductChip,
  ProductChip,
} from '@/components/ProductChip/ProductChip';
import { useLoadImage } from '@/hooks/useLoadImage';

interface IChip extends IProductChip {}

export const Chip: FC<IChip> = ({
  imageUrl: _imageUrl,
  ...product
}): JSX.Element => {
  const imageUrl = useLoadImage(_imageUrl);
  return <ProductChip {...product} imageUrl={imageUrl} />;
};
