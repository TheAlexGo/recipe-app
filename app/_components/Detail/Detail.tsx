import { FC, JSX, PropsWithChildren } from 'react';

import cn from 'classnames';
import { IconType } from 'react-icons';

export interface IDetail extends PropsWithChildren {
  icon: IconType;
  className?: string;
}

export const Detail: FC<IDetail> = ({
  icon: Icon,
  className,
  children,
}): JSX.Element => {
  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      <Icon />
      {children}
    </div>
  );
};
