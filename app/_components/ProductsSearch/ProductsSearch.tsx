import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  JSX,
  KeyboardEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';

import { searchInLenta } from '@/actions/product';
import { Input } from '@/components/Input';
import { ProductChip } from '@/components/ProductChip';
import {
  IAddIngredientModalStore,
  useAddIngredientModal,
} from '@/hooks/useAddIngredientModal';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { IProductDB } from '@/types/db';
import { Keys } from '@/utils/keyboard';
import { getLocal } from '@/utils/local';

interface IProductsSearch {
  onSelect: IAddIngredientModalStore['onSelect'];
}

export const ProductsSearch: FC<IProductsSearch> = ({
  onSelect,
}): JSX.Element => {
  const [showResults, setShowResults] = useState(false);
  const [products, setProducts] = useState<IProductDB[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onOpen } = useAddIngredientModal();

  const isMounted = useIsMounted();

  useOnClickOutside(containerRef, () => {
    setShowResults(false);
  });

  const debounced = useDebounceCallback((title: string) => {
    searchInLenta(title).then(({ data }) => {
      if (!isMounted()) {
        return;
      }
      setProducts(data);
    });
  }, 600);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      debounced(value);
    },
    [debounced],
  );

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === Keys.ESCAPE) {
      e.preventDefault();
      setShowResults(false);
    }
  };

  const addHandler = useCallback(
    (product: IProductDB) => {
      onOpen({
        product,
        onSelect,
      });
    },
    [onOpen, onSelect],
  );

  const focusHandler: FocusEventHandler<HTMLDivElement> = () => {
    setShowResults(true);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={keyDownHandler} onFocus={focusHandler} ref={containerRef}>
      <Input.Search onChange={changeHandler} />
      {showResults && (
        <div className="relative">
          <div className="absolute inset-x-0 top-0 max-h-64 overflow-auto rounded-xl bg-white p-4 shadow-card">
            {products.length ? (
              <ul className="flex flex-col gap-y-3">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductChip
                      {...product}
                      onAdd={addHandler}
                      withoutClamp
                      withAdd
                    />
                  </li>
                ))}
              </ul>
            ) : (
              getLocal('actions.search.notFound')
            )}
          </div>
        </div>
      )}
    </div>
  );
};
