'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import { FaArrowLeft } from 'react-icons/fa6';

import { Header } from '@/components/Header';
import { getLocal } from '@/utils/local';

interface IMyCreateHeader {
  recipeEdit?: boolean;
}

export const MyCreateHeader: FC<IMyCreateHeader> = ({
  recipeEdit,
}): JSX.Element => {
  const router = useRouter();

  const clickHandler = () => {
    NProgress.start();
    router.back();
  };

  return (
    <Header>
      <Header.Icon
        icon={FaArrowLeft}
        label={getLocal('action.backMyRecipe.label')}
        onClick={clickHandler}
      />
      <Header.Title>
        {getLocal(
          recipeEdit ? 'page.myEditRecipe.title' : 'page.myCreateRecipe.title',
        )}
      </Header.Title>
      <Header.Empty />
    </Header>
  );
};
