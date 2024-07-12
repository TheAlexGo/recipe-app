import { FC, InputHTMLAttributes, JSX } from 'react';

import cn from 'classnames';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<IInput> = ({ className, ...props }): JSX.Element => {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-2xl border border-neutral-gray-4 p-4',
        className,
      )}
    />
  );
};
