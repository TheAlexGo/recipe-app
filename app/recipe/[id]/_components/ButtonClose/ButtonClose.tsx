'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';

interface IButtonClose {}

export const ButtonClose: FC<IButtonClose> = (): JSX.Element => {
  const router = useRouter();
  return <Button.Close size="normal" onClick={router.back} />;
};
