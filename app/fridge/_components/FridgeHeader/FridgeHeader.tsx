'use client';

import { FC, JSX } from 'react';

import { IoQrCodeOutline } from 'react-icons/io5';

import { Header } from '@/components/Header';
import { useCameraModal } from '@/hooks/useCameraModal';

interface IFridgeHeader {}

export const FridgeHeader: FC<IFridgeHeader> = (): JSX.Element => {
  const { onOpen } = useCameraModal();

  return (
    <Header>
      <Header.Empty />
      <Header.Title>Холодильник</Header.Title>
      <Header.Icon
        icon={IoQrCodeOutline}
        label="Добавить продукт через сканирование QR-кода"
        onClick={onOpen}
      />
    </Header>
  );
};
