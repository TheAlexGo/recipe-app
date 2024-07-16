'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import { FaArrowLeft } from 'react-icons/fa6';

import { Header } from '@/components/Header';
import { getLocal } from '@/utils/local';

interface IMyHeader {}

export const MyHeader: FC<IMyHeader> = (): JSX.Element => {
  const router = useRouter();

  const clickHandler = () => {
    NProgress.start();
    router.replace('/profile');
  };

  return (
    <Header>
      <Header.Icon
        icon={FaArrowLeft}
        label={getLocal('action.backProfile.label')}
        onClick={clickHandler}
      />
      <Header.Title>{getLocal('page.myRecipes.title')}</Header.Title>
      <Header.Empty />
    </Header>
  );
};
