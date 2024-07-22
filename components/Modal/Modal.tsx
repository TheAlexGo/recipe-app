import {
  FC,
  JSX,
  KeyboardEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';

import cn from 'classnames';

import { useFocusTrap } from '@/hooks/useFocusTrap';

interface IModal extends PropsWithChildren {
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
}

interface IModalContent extends Omit<IModal, 'isOpen'> {}

const ModalContent: FC<IModalContent> = ({
  className,
  onClose,
  children,
}): JSX.Element | null => {
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef);

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = ({ key }) => {
    if (key === 'Escape') {
      onClose?.();
    }
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn(
        'fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75',
        className,
      )}
      onClick={onClose}
      onKeyDown={keyDownHandler}
      ref={modalRef}
    >
      {children}
    </div>
  );
};

export const Modal: FC<IModal> = ({ isOpen, ...props }): JSX.Element | null => {
  if (!isOpen) {
    return null;
  }

  return <ModalContent {...props} />;
};
