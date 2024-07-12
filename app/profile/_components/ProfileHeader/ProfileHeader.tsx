'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';
import { IoSettingsOutline } from 'react-icons/io5';

import { Header } from '@/components/Header';

interface IProfileHeader {}

export const ProfileHeader: FC<IProfileHeader> = (): JSX.Element => {
  const router = useRouter();

  const clickHandler = () => {
    router.push('profile/settings');
  };

  return (
    <Header>
      <Header.Empty />
      <Header.Title>Профиль</Header.Title>
      <Header.Icon
        icon={IoSettingsOutline}
        label="В настройки"
        onClick={clickHandler}
      />
    </Header>
  );
};
