'use client';

import { FC, JSX } from 'react';

import { logOut } from '@/actions/user';
import { Button } from '@/components/Button/Button';
import { getLocal } from '@/utils/local';

interface ILogoutButton {}

export const LogoutButton: FC<ILogoutButton> = (): JSX.Element => {
  const clickHandler = () => logOut();

  return (
    <Button view="danger" onClick={clickHandler}>
      {getLocal('profile.button.logout')}
    </Button>
  );
};
