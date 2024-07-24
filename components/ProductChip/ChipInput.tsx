import { FC, JSX } from 'react';

import cn from 'classnames';

import { Input } from '@/components/Input';
import { IInput } from '@/components/Input/Input';

interface IChipInput extends Omit<IInput, 'type'> {}

export const ChipInput: FC<IChipInput> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <Input
      {...props}
      className={cn(
        'max-w-14 [&::-webkit-inner-spin-button]:hidden',
        className,
      )}
      size="small"
      type="number"
    />
  );
};
