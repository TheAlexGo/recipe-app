'use client';

import { FC, JSX } from 'react';

import { useFormStatus } from 'react-dom';

import { Button, IButton } from '@/components/Button/Button';

interface ISubmit extends Omit<IButton, 'type'> {
  pendingText?: string;
}

export const Submit: FC<ISubmit> = ({
  children,
  pendingText,
  ...props
}): JSX.Element => {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} type="submit" disabled={pending}>
      {isPending && pendingText ? pendingText : children}
    </Button>
  );
};
