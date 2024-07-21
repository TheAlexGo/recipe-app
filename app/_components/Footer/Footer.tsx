'use client';

import { FC, JSX } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import { FaHouse, FaRegUser } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { PiChefHat } from 'react-icons/pi';
import { TbFridge } from 'react-icons/tb';

import { getRandomRecipe } from '@/actions/recipe';
import { Nav } from '@/components/Nav';
import { INavItem } from '@/components/Nav/Item';
import { getLocal } from '@/utils/local';

const getNavigations = (router: AppRouterInstance): INavItem[] => {
  return [
    {
      id: 'general',
      href: '/',
      icon: FaHouse,
      label: getLocal('nav.general.label'),
    },
    {
      id: 'search',
      href: '/search',
      icon: IoSearch,
      label: getLocal('nav.search.label'),
    },
    {
      id: 'chef',
      icon: PiChefHat,
      float: true,
      label: getLocal('nav.chef.label'),
      fill: false,
      onClick: async () => {
        NProgress.start();
        const { id } = await getRandomRecipe();
        router.push(`/recipe/${id}`);
      },
    },
    {
      id: 'fridge',
      href: '/fridge',
      icon: TbFridge,
      label: getLocal('nav.fridge.label'),
    },
    {
      id: 'profile',
      href: '/profile',
      icon: FaRegUser,
      label: getLocal('nav.profile.label'),
    },
  ];
};

interface IFooter {}

export const Footer: FC<IFooter> = (): JSX.Element => {
  const router = useRouter();

  return (
    <Nav>
      {getNavigations(router).map((nav) => (
        <Nav.Item key={nav.id} {...nav} />
      ))}
    </Nav>
  );
};
