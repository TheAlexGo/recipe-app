'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';

import { getLocal } from '@/utils/local';

import { Icon, IIcon } from './Icon';

interface IClose extends Omit<IIcon, 'icon'> {}

export const Close: FC<IClose> = ({ ...props }): JSX.Element => {
  const router = useRouter();

  const clickHandler = () => {
    router.back();
  };

  return (
    <Icon
      {...props}
      icon={IoClose}
      onClick={clickHandler}
      aria-label={getLocal('actions.card.close')}
    />
  );
};
