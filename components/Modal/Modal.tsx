import { FC, JSX, PropsWithChildren } from 'react';

interface IModal extends PropsWithChildren {
  isOpen: boolean;
}

export const Modal: FC<IModal> = ({ isOpen, children }): JSX.Element | null => {
  if (!isOpen) {
    return null;
  }
  return <div>{children}</div>;
};
