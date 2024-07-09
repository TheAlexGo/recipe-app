'use client';

import { FC, JSX } from 'react';

import { logOut } from '@/actions/login';

interface ILogoutButton {}

export const LogoutButton: FC<ILogoutButton> = (): JSX.Element => {
  const clickHandler = () => logOut();

  return (
    <button type="button" onClick={clickHandler}>
      Выйти
    </button>
  );
};
