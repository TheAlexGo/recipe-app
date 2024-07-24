'use client';

import { FC, JSX } from 'react';

import { IRecipeProduct } from '@/actions/models/Recipe';
import { Ingredients } from '@/components/Ingredients';
import { ProductChip } from '@/components/ProductChip';
import { getLocal } from '@/utils/local';

import { IPanel, Panel } from './Panel';

interface IIngredientsPanel extends Omit<IPanel, 'id'> {
  items: IRecipeProduct[];
}

export const IngredientsPanel: FC<IIngredientsPanel> = ({
  items,
  ...props
}): JSX.Element => {
  return (
    <Panel {...props} id="ingredients">
      <Ingredients count={items.length}>
        {items.map((item) => (
          <Ingredients.Item key={item.id}>
            <ProductChip product={item}>
              <ProductChip.Input
                defaultValue={item.count}
                size="small"
                name="productCount"
                fill={false}
                aria-label={getLocal('input.label.inputCount')}
                readOnly
                disabled
              />
            </ProductChip>
          </Ingredients.Item>
        ))}
      </Ingredients>
    </Panel>
  );
};
