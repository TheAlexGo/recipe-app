'use client';

import { FC, JSX } from 'react';

import Image from 'next/image';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal/Modal';
import { useProductModal } from '@/hooks/useProductModal';
import { getLocal } from '@/utils/local';

interface IProductModal {}

export const ProductModal: FC<IProductModal> = (): JSX.Element | null => {
  const { isOpen, onClose, product } = useProductModal();
  if (!product) {
    return null;
  }
  return (
    <Modal isOpen={isOpen}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75">
        <Button.Close
          size="normal"
          className="absolute left-6 top-3 z-10"
          onClick={onClose}
        />
        <div className="m-6 rounded-lg bg-white p-6">
          <Image
            className="size-64 object-contain"
            src={product.image_url}
            width={256}
            height={256}
            alt={getLocal('image.cover')}
          />
          <h1 className="mt-3 text-xl font-bold">{product.title}</h1>
        </div>
      </div>
    </Modal>
  );
};
