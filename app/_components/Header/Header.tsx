'use client';

import { FC, JSX, useMemo } from 'react';

import { IconType } from 'react-icons';
import {
  WiDayCloudy,
  WiDayHaze,
  WiDaySunny,
  WiNightClear,
} from 'react-icons/wi';

import { IUser } from '@/actions/getUser';
import { getLocal } from '@/utils/local';

interface IHeader {
  user: IUser;
}

export const Header: FC<IHeader> = ({ user }): JSX.Element => {
  const [timeText, Icon] = useMemo((): [
    'morning' | 'day' | 'evening' | 'night',
    IconType,
  ] => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 9) {
      return ['morning', WiDayCloudy];
    }
    if (hours >= 9 && hours < 17) {
      return ['day', WiDaySunny];
    }
    if (hours >= 17 && hours < 21) {
      return ['evening', WiDayHaze];
    }
    return ['night', WiNightClear];
  }, []);

  return (
    <header>
      <div className="flex gap-1">
        <Icon className="size-5 text-brand-dark" />
        <span className="text-sm">{getLocal(`good.${timeText}`)},</span>
      </div>
      <h1 className="text-2xl font-bold">{user.fullname}</h1>
    </header>
  );
};
