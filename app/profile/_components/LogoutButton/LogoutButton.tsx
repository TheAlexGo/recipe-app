'use client';

import { FC, JSX, useCallback } from 'react';

import NProgress from 'nprogress';

import { logOut } from '@/actions/user';
import { Button } from '@/components/Button/Button';
import { getLocal } from '@/utils/local';

interface ILogoutButton {
  className?: string;
}

export const LogoutButton: FC<ILogoutButton> = ({ className }): JSX.Element => {
  const clickHandler = useCallback(() => {
    NProgress.start();
    logOut();
  }, []);

  return (
    <Button view="danger" className={className} onClick={clickHandler}>
      {getLocal('profile.button.logout')}
    </Button>
  );
};
