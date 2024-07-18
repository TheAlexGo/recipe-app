'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import { IoSettingsOutline } from 'react-icons/io5';

import { Header } from '@/components/Header';
import { getLocal } from '@/utils/local';

interface IProfileHeader {}

export const ProfileHeader: FC<IProfileHeader> = (): JSX.Element => {
  const router = useRouter();

  const clickHandler = () => {
    NProgress.start();
    router.push('settings');
  };

  return (
    <Header>
      <Header.Empty />
      <Header.Title>{getLocal('page.profile.title')}</Header.Title>
      <Header.Icon
        icon={IoSettingsOutline}
        label={getLocal('page.profile.action.settings.label')}
        onClick={clickHandler}
      />
    </Header>
  );
};
