import { FC, JSX, TextareaHTMLAttributes } from 'react';

import { getInputClasses } from '@/components/Input/class';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: FC<ITextarea> = ({ ...props }): JSX.Element => {
  return <textarea {...props} className={getInputClasses({})} />;
};
