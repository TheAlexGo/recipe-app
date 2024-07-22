import { Suspense } from 'react';

import { CgSpinner } from 'react-icons/cg';
import { FaArrowLeft } from 'react-icons/fa6';

import { SearchResult } from '@/app/fridge/search/_components/SearchResult';
import { Header } from '@/components/Header';
import { getLocal } from '@/utils/local';

import { SearchInput } from './_components/SearchInput';

export default async function FridgeSearchPage({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  return (
    <div className="flex flex-1 flex-col">
      <Header className="z-10">
        <Header.Icon
          href="/fridge"
          icon={FaArrowLeft}
          label={getLocal('page.fridge.action.backFridge.label')}
        />
        <Header.Title>{getLocal('page.search.title')}</Header.Title>
        <Header.Empty />
      </Header>
      <SearchInput defaultValue={query} />
      <div className="relative flex-1">
        <Suspense
          key={query}
          fallback={
            <CgSpinner className="absolute inset-0 m-auto size-16 animate-spin text-brand-dark" />
          }
        >
          <SearchResult query={query} />
        </Suspense>
      </div>
    </div>
  );
}
