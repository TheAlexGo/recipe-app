import { FC, JSX, TextareaHTMLAttributes } from 'react';

import { inputClasses } from '@/components/Input/class';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: FC<ITextarea> = ({ ...props }): JSX.Element => {
  return <textarea {...props} className={inputClasses} />;
};
