import { FC, JSX } from 'react';

import { IRecipeProduct } from '@/actions/models/Recipe';
import { Ingredients } from '@/components/Ingredients';
import { ProductChip } from '@/components/ProductChip';

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
            <ProductChip {...item} />
            {item.count}
          </Ingredients.Item>
        ))}
      </Ingredients>
    </Panel>
  );
};
