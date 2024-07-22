import { FC, JSX, memo, MouseEventHandler } from 'react';

import cn from 'classnames';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

import { Button } from '@/components/Button';
import { getLocal } from '@/utils/local';

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
        <Button.Icon
          className={cn({
            'text-brand-secondary': !disabledRemove,
            'text-neutral-gray-3': disabledRemove,
          })}
          icon={CiSquareMinus}
          size="normal"
          onClick={onRemove}
          aria-label={getLocal('actions.remove')}
          disabled={disabledRemove}
          withPadding={false}
        />
        {value}
        <Button.Icon
          className="text-brand-secondary"
          icon={CiSquarePlus}
          size="normal"
          onClick={onAdd}
          aria-label={getLocal('actions.add')}
          withPadding={false}
        />
      </div>
    );
  },
);

Counter.displayName = 'Counter';
