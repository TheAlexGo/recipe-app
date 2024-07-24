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
import { Keys } from '@/utils/keyboard';

interface IModal extends PropsWithChildren {
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
  opacity?: '75' | '100';
}

interface IModalContent extends Omit<IModal, 'isOpen'> {}

const ModalContent: FC<IModalContent> = ({
  className,
  onClose,
  children,
  opacity = '75',
}): JSX.Element | null => {
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef);

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = ({ key }) => {
    if (key === Keys.ESCAPE) {
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
        'fixed inset-0 z-10 flex items-center justify-center bg-black',
        {
          'bg-opacity-75': opacity === '75',
          'bg-opacity-100': opacity === '100',
        },
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
