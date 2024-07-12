'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

import { Header } from '@/components/Header';

interface ISettingsHeader {}

export const SettingsHeader: FC<ISettingsHeader> = (): JSX.Element => {
  const router = useRouter();

  const clickHandler = () => {
    router.replace('/profile');
  };

  return (
    <Header>
      <Header.Icon
        icon={FaArrowLeft}
        label="Вернуться в профиль"
        onClick={clickHandler}
      />
      <Header.Title>Профиль</Header.Title>
      <Header.Empty />
    </Header>
  );
};
