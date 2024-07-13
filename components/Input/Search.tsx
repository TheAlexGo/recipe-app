import { FC, JSX } from 'react';

import cn from 'classnames';
import { FaSearch } from 'react-icons/fa';

import { inputClasses } from '@/components/Input/class';

import { IInput } from './Input';

interface ISearch extends Omit<IInput, 'type'> {}

export const Search: FC<ISearch> = ({ className, ...props }): JSX.Element => {
  return (
    <div className="relative">
      <FaSearch className="absolute inset-y-0 left-4 my-auto size-5 text-neutral-dark" />
      <input
        {...props}
        className={cn(
          inputClasses,
          'pl-[3.25rem] [&::-webkit-search-cancel-button]:hidden',
          className,
        )}
        type="search"
      />
    </div>
  );
};
