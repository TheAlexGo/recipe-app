import { FC, JSX } from 'react';

import { searchInLenta } from '@/actions/product';
import { ProductFridgeChip } from '@/app/_components/ProductFridgeChip/ProductFridgeChip';

interface ISearchResult {
  query: string;
}

export const SearchResult: FC<ISearchResult> = async ({
  query,
}): Promise<JSX.Element> => {
  const { data, message } = query
    ? await searchInLenta(query)
    : { data: [], message: '' };
  return (
    <div className="mt-3 flex flex-col gap-y-3">
      {message && <span className="text-brand-danger">{message}</span>}
      {data.map((product) => (
        <ProductFridgeChip key={product.id} {...product} />
      ))}
    </div>
  );
};
