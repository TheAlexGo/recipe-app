'use client';

import { FC, JSX, useEffect, useState } from 'react';

import { AddIngredientModal } from '@/components/Modal/components/AddIngredientModal/AddIngredientModal';
import { CameraModal } from '@/components/Modal/components/CameraModal/CameraModal';
import { ProductModal } from '@/components/Modal/components/ProductModal/ProductModal';

interface IModalProvider {}

export const ModalProvider: FC<IModalProvider> = (): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CameraModal />
      <ProductModal />
      <AddIngredientModal />
    </>
  );
};
