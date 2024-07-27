'use client';

import { FC, JSX } from 'react';

import { logOut } from '@/actions/user';
import { Button } from '@/components/Button/Button';
import { getLocal } from '@/utils/local';

interface ILogoutButton {
  className?: string;
}

export const LogoutButton: FC<ILogoutButton> = ({ className }): JSX.Element => {
  return (
    <Button view="danger" className={className} onClick={logOut}>
      {getLocal('profile.button.logout')}
    </Button>
  );
};
