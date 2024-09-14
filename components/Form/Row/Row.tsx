import { FC, JSX, LabelHTMLAttributes } from 'react';

import cn from 'classnames';

interface IRow extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Row: FC<IRow> = ({
  children,
  className,
  ...props
}): JSX.Element => {
  return (
    <label {...props} className={cn('flex flex-col', className)}>
      {children}
    </label>
  );
};
