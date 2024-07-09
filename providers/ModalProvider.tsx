'use client';

import { FC, JSX, useEffect, useState } from 'react';

import { CameraModal } from '@/components/Modal/components/CameraModal/CameraModal';

interface IModalProvider {}

export const ModalProvider: FC<IModalProvider> = (): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <CameraModal />;
};
