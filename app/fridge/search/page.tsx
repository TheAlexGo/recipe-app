import { Suspense } from 'react';

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
    <div>
      <Header>
        <Header.Icon
          href="/fridge"
          icon={FaArrowLeft}
          label={getLocal('page.fridge.action.backFridge.label')}
        />
        <Header.Title>{getLocal('page.search.title')}</Header.Title>
        <Header.Empty />
      </Header>
      <SearchInput defaultValue={query} />
      <Suspense key={query} fallback={<div>Loading...</div>}>
        <SearchResult query={query} />
      </Suspense>
    </div>
  );
}
