import { FC, JSX, PropsWithChildren } from 'react';

import { Button } from '@/components/Button';
import { getLocal } from '@/utils/local';

interface IIngredients extends PropsWithChildren {
  count: number;
}

export const Ingredients: FC<IIngredients> = ({
  count,
  children,
}): JSX.Element => {
  return (
    <section>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-y-0.5">
          <h3 className="text-xl font-bold">{getLocal('ingredients.title')}</h3>
          <p className="text-neutral-gray-5">
            {count} {getLocal('ingredients.item')}
          </p>
        </div>
        <Button.Link>{getLocal('ingredients.addAllToCart')}</Button.Link>
      </div>
      <ul className="mt-3 flex flex-col gap-y-3">{children}</ul>
    </section>
  );
};
