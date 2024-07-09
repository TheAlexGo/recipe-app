'use client';

import { FC, JSX } from 'react';

import { FaSearch } from 'react-icons/fa';
import { FaHouse, FaRegUser } from 'react-icons/fa6';
import { PiChefHat } from 'react-icons/pi';
import { TbFridge } from 'react-icons/tb';

import { Nav } from '@/components/Nav';
import { INavItem } from '@/components/Nav/Item';

const navigations: INavItem[] = [
  {
    href: '/',
    icon: FaHouse,
    label: 'Главная',
  },
  {
    href: '/search',
    icon: FaSearch,
    label: 'Поиск',
  },
  {
    href: '/chef',
    icon: PiChefHat,
    float: true,
    label: 'Готовить',
  },
  {
    href: '/fridge',
    icon: TbFridge,
    label: 'Холодильник',
  },
  {
    href: '/profile',
    icon: FaRegUser,
    label: 'Профиль',
  },
];

interface IFooter {}

export const Footer: FC<IFooter> = (): JSX.Element => {
  return (
    <Nav>
      {navigations.map((nav) => (
        <Nav.Item key={nav.href} {...nav} />
      ))}
    </Nav>
  );
};
