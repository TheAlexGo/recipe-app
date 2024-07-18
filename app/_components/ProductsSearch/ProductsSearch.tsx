'use client';

import { ChangeEventHandler, FC, JSX, useCallback } from 'react';

import { searchInLenta } from '@/actions/product';
import { Input } from '@/components/Input';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';

interface IProductsSearch {}

export const ProductsSearch: FC<IProductsSearch> = (): JSX.Element => {
  const debounced = useDebounceCallback((title: string) => {
    searchInLenta(title);
  }, 600);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      debounced(value);
    },
    [debounced],
  );

  return (
    <div>
      <Input.Search onChange={changeHandler} />
      <ul>
        <li />
      </ul>
    </div>
  );
};
