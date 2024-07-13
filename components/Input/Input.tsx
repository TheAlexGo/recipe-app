import { FC, InputHTMLAttributes, JSX } from 'react';

import cn from 'classnames';

import { inputClasses } from '@/components/Input/class';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<IInput> = ({ className, ...props }): JSX.Element => {
  return <input {...props} className={cn(inputClasses, className)} />;
};
