'use client';

import { ChangeEventHandler, FC, JSX } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/Input';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';

interface ISearchInput {
  defaultValue?: string;
}

export const SearchInput: FC<ISearchInput> = ({
  defaultValue,
}): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const invokeFetch = useDebounceCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', query);
    if (!query) {
      params.delete('query');
    }

    router.replace(`${pathname}?${params}`);
  }, 600);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    invokeFetch(value);
  };

  return <Input.Search onChange={changeHandler} defaultValue={defaultValue} />;
};
