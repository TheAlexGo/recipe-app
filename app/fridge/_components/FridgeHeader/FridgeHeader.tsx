'use client';

import { FC, JSX } from 'react';

import { IoQrCodeOutline } from 'react-icons/io5';

import { Header } from '@/components/Header';
import { useCameraModal } from '@/hooks/useCameraModal';
import { getLocal } from '@/utils/local';

interface IFridgeHeader {}

export const FridgeHeader: FC<IFridgeHeader> = (): JSX.Element => {
  const { onOpen } = useCameraModal();

  return (
    <Header>
      <Header.Empty />
      <Header.Title>{getLocal('page.fridge.title')}</Header.Title>
      <Header.Icon
        icon={IoQrCodeOutline}
        label={getLocal('page.fridge.action.qr.label')}
        onClick={onOpen}
      />
    </Header>
  );
};
