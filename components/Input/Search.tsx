import { FC, JSX } from 'react';

import cn from 'classnames';
import { IoSearch } from 'react-icons/io5';

import { getInputClasses } from '@/components/Input/class';

import { IInput } from './Input';

interface ISearch extends Omit<IInput, 'type'> {}

export const Search: FC<ISearch> = ({
  className,
  size,
  fill,
  ...props
}): JSX.Element => {
  return (
    <div className="relative">
      <IoSearch className="absolute inset-y-0 left-4 my-auto size-5 text-neutral-dark" />
      <input
        {...props}
        className={cn(
          getInputClasses({ size, fill }),
          'pl-[3.25rem] [&::-webkit-search-cancel-button]:hidden',
          className,
        )}
        type="search"
      />
    </div>
  );
};
