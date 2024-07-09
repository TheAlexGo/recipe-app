'use client';

import { ButtonHTMLAttributes, FC, JSX } from 'react';

import { useFormStatus } from 'react-dom';

interface ISubmitButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  pendingText?: string;
}

export const SubmitButton: FC<ISubmitButton> = ({
  children,
  pendingText,
  ...props
}): JSX.Element => {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  );
};
