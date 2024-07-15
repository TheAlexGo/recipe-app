import { FC, JSX, PropsWithChildren } from 'react';

import cn from 'classnames';

interface ISection extends PropsWithChildren {
  className?: string;
}

export const Section: FC<ISection> = ({ className, children }): JSX.Element => {
  return (
    <section className={cn('flex flex-col gap-y-3', className)}>
      {children}
    </section>
  );
};
