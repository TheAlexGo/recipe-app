'use client';

import { FC, JSX, useCallback, useState } from 'react';

import { IRecipe } from '@/actions/models/Recipe';
import { ProductsSearch } from '@/app/_components/ProductsSearch/ProductsSearch';
import { DynamicInstruction } from '@/app/recipe/_components/DynamicInstruction/DynamicInstruction';
import { create, update } from '@/app/recipe/action';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProductChip } from '@/components/ProductChip';
import {
  IAddIngredientModalStore,
  useAddIngredientModal,
} from '@/hooks/useAddIngredientModal';
import { useLoadImage } from '@/hooks/useLoadImage';
import { IProductDB } from '@/types/db';
import { IMAGE_PLACEHOLDER } from '@/utils/image';
import { getLocal } from '@/utils/local';

interface IRecipeForm {
  recipe?: IRecipe;
}

export const RecipeForm: FC<IRecipeForm> = ({ recipe }): JSX.Element => {
  const prevCover = useLoadImage('recipe_covers', recipe?.cover_url);
  const [cover, setCover] = useState<string>(prevCover || IMAGE_PLACEHOLDER);
  const [ingredients, setIngredients] = useState(recipe?.ingredients || []);
  const [loadingCover, setLoadingCover] = useState(false);
  const { onClose } = useAddIngredientModal();

  const removeIngredientHandler = (productId: IProductDB['id']) => {
    return () =>
      setIngredients((prevIngredients) =>
        prevIngredients.filter(({ id }) => id !== productId),
      );
  };

  const selectProductHandler: IAddIngredientModalStore['onSelect'] =
    useCallback(
      ({ product, count }) => {
        setIngredients((prevIngredients) => {
          const existedProduct = prevIngredients.find(
            ({ id }) => id === product.id,
          );
          if (existedProduct) {
            return [...prevIngredients];
          }
          return [
            ...prevIngredients,
            {
              ...product,
              count,
            },
          ];
        });
        onClose();
      },
      [onClose],
    );

  const loadingCoverHandler = useCallback(() => {
    setLoadingCover(true);
  }, []);

  const loadedCoverHandler = useCallback(() => {
    setLoadingCover(false);
  }, []);

  return (
    <form className="flex flex-col gap-y-3">
      {recipe && (
        <Input
          className="hidden"
          type="text"
          name="recipeId"
          defaultValue={recipe.id}
          readOnly
          hidden
        />
      )}
      <label htmlFor="title">
        <span>{getLocal('form.title.label')}</span>
        <Input
          id="title"
          type="text"
          name="title"
          defaultValue={recipe?.title}
          required
        />
      </label>
      <label htmlFor="less_title">
        <span>{getLocal('form.less_title.label')}</span>
        <Input
          id="less_title"
          type="text"
          name="less_title"
          defaultValue={recipe?.less_title}
          required
        />
      </label>
      <label htmlFor="description">
        <span>{getLocal('form.description.label')}</span>
        <Input.TextArea
          id="description"
          name="description"
          rows={3}
          defaultValue={recipe?.description}
          required
        />
      </label>
      <label htmlFor="kcal">
        <span>{getLocal('form.kcal.label')}</span>
        <Input
          id="kcal"
          type="text"
          name="kcal"
          defaultValue={recipe?.kcal}
          required
        />
      </label>
      <label htmlFor="cooking_time">
        <span>{getLocal('form.cooking_time.label')}</span>
        <Input
          id="cooking_time"
          type="text"
          name="cooking_time"
          defaultValue={recipe?.cooking_time}
          required
        />
      </label>
      <DynamicInstruction />
      <label htmlFor="recipe_text">
        <span>{getLocal('form.recipe_text.label')}</span>
        <Input.TextArea
          id="recipe_text"
          name="recipe_text"
          rows={5}
          defaultValue={recipe?.recipe_text}
          required
        />
      </label>
      <label htmlFor="cover">
        <span>{getLocal('form.cover.label')}</span>
        <Input.Image
          id="cover"
          name="cover"
          value={cover}
          prevValue={prevCover}
          alt={getLocal('images.alt.avatar')}
          onChange={setCover}
          onLoading={loadingCoverHandler}
          onLoaded={loadedCoverHandler}
        />
      </label>
      <div>
        <h2>{getLocal('ingredients.title')}</h2>
        <ProductsSearch onSelect={selectProductHandler} />
        <ul className="mt-3 flex min-h-64 flex-col gap-y-3">
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient.id}>
                <ProductChip product={ingredient}>
                  <ProductChip.Input
                    defaultValue={ingredient.count}
                    size="small"
                    name="productCount"
                    fill={false}
                    aria-label={getLocal('input.label.inputCount')}
                  />
                  <ProductChip.Remove
                    product={ingredient}
                    onRemove={removeIngredientHandler(ingredient.id)}
                  />
                </ProductChip>
                <input
                  className="hidden"
                  type="text"
                  name="productId"
                  defaultValue={ingredient.id}
                  readOnly
                />
              </li>
            );
          })}
        </ul>
      </div>
      <Button.Submit
        formAction={recipe ? update : create}
        disabled={loadingCover}
      >
        {getLocal('form.create')}
      </Button.Submit>
    </form>
  );
};
