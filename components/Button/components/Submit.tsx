'use client';

import { FC, JSX } from 'react';

import { useFormStatus } from 'react-dom';

import { Button, IButtonProps } from '@/components/Button/Button';

interface ISubmit extends Omit<IButtonProps, 'type'> {
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
    <Button {...props} type="submit" disabled={props.disabled || pending}>
      {isPending && pendingText ? pendingText : children}
    </Button>
  );
};
