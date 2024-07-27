import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  JSX,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Input } from '@/components/Input';
import { ProductChip } from '@/components/ProductChip';
import { Spinner } from '@/components/Spinner/Spinner';
import {
  IAddIngredientModalStore,
  useAddIngredientModal,
} from '@/hooks/useAddIngredientModal';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { IProductDB } from '@/types/db';
import { makeRequest } from '@/utils/fetch';
import { Keys } from '@/utils/keyboard';
import { getLocal } from '@/utils/local';
import logger from '@/utils/logger';

interface IProductsSearch {
  onSelect: IAddIngredientModalStore['onSelect'];
}

export const ProductsSearch: FC<IProductsSearch> = ({
  onSelect,
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [products, setProducts] = useState<IProductDB[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const { onOpen } = useAddIngredientModal();

  useOnClickOutside(containerRef, () => {
    setShowResults(false);
  });

  const debounced = useDebounceCallback((title: string) => {
    setShowResults(true);
    setLoading(true);
    if (controllerRef.current) {
      controllerRef.current?.abort();
    }
    const { controller, request } = makeRequest(`/api/search?query=${title}`);
    controllerRef.current = controller;
    request
      .then((res) => res.json())
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          logger.log('Запрос отменён');
        } else {
          setLoading(false);
        }
      });
  }, 600);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      debounced(value);
    },
    [debounced],
  );

  const clickHandler: MouseEventHandler<HTMLInputElement> = useCallback(() => {
    if (!showResults) {
      setShowResults(true);
    }
  }, [showResults]);

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
        onSelect: (params) => {
          setShowResults(false);
          onSelect?.(params);
        },
      });
    },
    [onOpen, onSelect],
  );

  const focusHandler: FocusEventHandler<HTMLDivElement> = () => {
    setShowResults(true);
  };

  useEffect(
    () => () => {
      controllerRef.current?.abort();
    },
    [],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={keyDownHandler} ref={containerRef}>
      <Input.Search
        onChange={changeHandler}
        onFocus={focusHandler}
        onClick={clickHandler}
        aria-label={getLocal('input.title.product.search')}
        placeholder={getLocal('input.placeholder.product.search')}
      />
      {showResults && (
        <div className="relative">
          <div className="absolute inset-x-0 top-0 max-h-64 overflow-auto rounded-xl bg-white p-4 shadow-card">
            {loading ? (
              <Spinner size="small" position="static" />
            ) : products.length ? (
              <ul className="flex flex-col gap-y-3">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductChip
                      product={product}
                      withPadding={false}
                      withShadow={false}
                    >
                      <ProductChip.Add product={product} onAdd={addHandler} />
                    </ProductChip>
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
