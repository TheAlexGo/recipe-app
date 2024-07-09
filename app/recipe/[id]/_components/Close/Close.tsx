'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';

interface IClose {}

export const Close: FC<IClose> = (): JSX.Element => {
  const router = useRouter();

  const clickHandler = () => {
    router.back();
  };

  return <Button.Close onClick={clickHandler} />;
};
