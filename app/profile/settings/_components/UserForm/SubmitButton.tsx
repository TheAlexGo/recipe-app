'use client';

import { FC, JSX, PropsWithChildren } from 'react';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/Button';

interface ISubmitButton extends PropsWithChildren {}

export const SubmitButton: FC<ISubmitButton> = ({ children }): JSX.Element => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" view="primary" disabled={pending}>
      {children}
    </Button>
  );
};
