import { FC, InputHTMLAttributes, JSX } from 'react';

import cn from 'classnames';

import { getInputClasses } from '@/components/Input/class';
import { InputSizes } from '@/components/Input/types';

export interface IInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSizes;
  fill?: boolean;
  error?: boolean;
}

export const Input: FC<IInput> = ({
  className,
  size = 'normal',
  fill = true,
  error = false,
  ...props
}): JSX.Element => {
  return (
    <input
      {...props}
      className={cn(getInputClasses({ size, fill, error }), className)}
    />
  );
};
