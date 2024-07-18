'use client';

import { FC, JSX } from 'react';

import { IoClose } from 'react-icons/io5';

import { getLocal } from '@/utils/local';

import { Icon, IIcon } from './Icon';

interface IClose extends Omit<IIcon, 'icon'> {}

export const Close: FC<IClose> = ({ ...props }): JSX.Element => {
  return (
    <Icon
      {...props}
      icon={IoClose}
      aria-label={getLocal('actions.card.close')}
    />
  );
};
