'use client';

import { FC, JSX } from 'react';

import { FaSearch } from 'react-icons/fa';
import { FaHouse, FaRegUser } from 'react-icons/fa6';
import { PiChefHat } from 'react-icons/pi';
import { TbFridge } from 'react-icons/tb';

import { Nav } from '@/components/Nav';
import { INavItem } from '@/components/Nav/Item';
import { getLocal } from '@/utils/local';

const navigations: INavItem[] = [
  {
    href: '/',
    icon: FaHouse,
    label: getLocal('nav.general.label'),
  },
  {
    href: '/search',
    icon: FaSearch,
    label: getLocal('nav.search.label'),
  },
  {
    href: '/chef',
    icon: PiChefHat,
    float: true,
    label: getLocal('nav.chef.label'),
  },
  {
    href: '/fridge',
    icon: TbFridge,
    label: getLocal('nav.fridge.label'),
  },
  {
    href: '/profile',
    icon: FaRegUser,
    label: getLocal('nav.profile.label'),
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
