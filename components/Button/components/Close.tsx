import { ButtonHTMLAttributes, FC, JSX } from 'react';

import cn from 'classnames';
import { IoClose } from 'react-icons/io5';

interface IClose extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Close: FC<IClose> = ({ ...props }): JSX.Element => {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        'absolute left-6 top-3 rounded-xl bg-white p-2',
        props.className,
      )}
      aria-label="Закрыть"
    >
      <IoClose className="size-6" />
    </button>
  );
};
