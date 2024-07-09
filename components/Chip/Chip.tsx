import { FC, JSX, PropsWithChildren } from 'react';

import cn from 'classnames';

interface IChip extends PropsWithChildren {
  active?: boolean;
}

export const Chip: FC<IChip> = ({ children, active }): JSX.Element => {
  return (
    <button
      type="button"
      className={cn('flex items-center justify-center rounded-full px-6 py-2', {
        'bg-brand-secondary text-white': active,
        'bg-neutral-gray-1 text-neutral-dark': !active,
      })}
    >
      {children}
    </button>
  );
};
