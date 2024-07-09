import { FC, JSX, memo, MouseEventHandler } from 'react';

import cn from 'classnames';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

interface ICounter {
  value: number;
  onAdd: MouseEventHandler<HTMLButtonElement>;
  onRemove: MouseEventHandler<HTMLButtonElement>;
}

export const Counter: FC<ICounter> = memo(
  ({ value, onAdd, onRemove }): JSX.Element => {
    const disabledRemove = value <= 0;

    return (
      <div className="flex gap-x-1.5">
        <button
          className={cn({
            'text-brand-secondary': !disabledRemove,
            'text-neutral-gray-3': disabledRemove,
          })}
          type="button"
          onClick={onRemove}
          aria-label="Убавить"
          disabled={disabledRemove}
        >
          <CiSquareMinus className="size-6" />
        </button>
        {value}
        <button
          className="text-brand-secondary"
          type="button"
          onClick={onAdd}
          aria-label="Добавить"
        >
          <CiSquarePlus className="size-6" />
        </button>
      </div>
    );
  },
);

Counter.displayName = 'Counter';
