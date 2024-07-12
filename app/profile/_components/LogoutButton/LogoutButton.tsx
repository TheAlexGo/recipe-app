'use client';

import { FC, JSX } from 'react';

import { logOut } from '@/actions/login';
import { Button } from '@/components/Button/Button';

interface ILogoutButton {}

export const LogoutButton: FC<ILogoutButton> = (): JSX.Element => {
  const clickHandler = () => logOut();

  return (
    <Button view="danger" onClick={clickHandler}>
      Выйти
    </Button>
  );
};
