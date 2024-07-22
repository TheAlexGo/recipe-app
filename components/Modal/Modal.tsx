import { FC, JSX, PropsWithChildren, useEffect } from 'react';

interface IModal extends PropsWithChildren {
  isOpen: boolean;
}

export const Modal: FC<IModal> = ({ isOpen, children }): JSX.Element | null => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  return <div>{children}</div>;
};
