'use client';

import { FC, JSX } from 'react';

import { IoQrCodeOutline, IoSearch } from 'react-icons/io5';

import { Header } from '@/components/Header';
import { useCameraModal } from '@/hooks/useCameraModal';
import { getLocal } from '@/utils/local';

interface IFridgeHeader {}

export const FridgeHeader: FC<IFridgeHeader> = (): JSX.Element => {
  const { onOpen } = useCameraModal();

  return (
    <Header>
      <Header.Icon
        icon={IoSearch}
        href="search"
        label={getLocal('page.fridge.action.search.label')}
      />
      <Header.Title>{getLocal('page.fridge.title')}</Header.Title>
      <Header.Icon
        icon={IoQrCodeOutline}
        label={getLocal('page.fridge.action.qr.label')}
        onClick={onOpen}
      />
    </Header>
  );
};
