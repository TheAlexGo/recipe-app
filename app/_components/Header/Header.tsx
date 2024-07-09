import { FC, JSX } from 'react';

import { WiDaySunny } from 'react-icons/wi';

import { IUser } from '@/actions/getUser';

interface IHeader {
  user: IUser;
}

export const Header: FC<IHeader> = ({ user }): JSX.Element => {
  return (
    <header>
      <div className="flex gap-1">
        <WiDaySunny className="size-5 text-brand-dark" />
        <span className="text-sm">Good Morning</span>
      </div>
      <h1 className="text-2xl font-bold">{user.fullname}</h1>
    </header>
  );
};
