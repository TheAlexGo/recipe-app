import { FC, JSX } from 'react';

import cn from 'classnames';
import { CgSpinner } from 'react-icons/cg';

interface ISpinner {
  size: 'normal' | 'small';
  position: 'absolute' | 'static';
}

export const Spinner: FC<ISpinner> = ({ size, position }): JSX.Element => {
  return (
    <CgSpinner
      className={cn('m-auto animate-spin text-brand-dark', {
        'absolute inset-0': position === 'absolute',
        static: position === 'static',
        'size-16': size === 'normal',
        'size-8': size === 'small',
      })}
    />
  );
};
