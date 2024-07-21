import { FC, JSX } from 'react';

import { searchInLenta } from '@/actions/product';
import { ProductFridgeChip } from '@/app/_components/ProductFridgeChip/ProductFridgeChip';

interface ISearchResult {
  query: string;
}

export const SearchResult: FC<ISearchResult> = async ({
  query,
}): Promise<JSX.Element> => {
  const result = query ? await searchInLenta(query) : [];
  return (
    <div className="mt-3 flex flex-col gap-y-3">
      {result.map((product) => (
        <ProductFridgeChip key={product.id} {...product} />
      ))}
    </div>
  );
};
