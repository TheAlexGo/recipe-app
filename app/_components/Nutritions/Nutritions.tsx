import { FC, JSX, PropsWithChildren } from 'react';

import cn from 'classnames';

interface INutrition extends PropsWithChildren {
  className?: string;
}

export const Nutritions: FC<INutrition> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <ul className={cn('gap grid grid-cols-2 gap-4', className)}>{children}</ul>
  );
};
