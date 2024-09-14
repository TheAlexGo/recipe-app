import { FC, HTMLAttributes, JSX } from 'react';

import cn from 'classnames';

interface ILabel extends HTMLAttributes<HTMLSpanElement> {}

export const Title: FC<ILabel> = ({
  children,
  className,
  ...props
}): JSX.Element => {
  return (
    <span {...props} className={cn('text-md', className)}>
      {children}
    </span>
  );
};
