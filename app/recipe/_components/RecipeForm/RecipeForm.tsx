'use client';

import { FC, JSX, useCallback, useState } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import { IRecipe } from '@/actions/models/Recipe';
import { ProductsSearch } from '@/app/_components/ProductsSearch/ProductsSearch';
import { create, update } from '@/app/recipe/action';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProductChip } from '@/components/ProductChip';
import { Spinner } from '@/components/Spinner';
import {
  IAddIngredientModalStore,
  useAddIngredientModal,
} from '@/hooks/useAddIngredientModal';
import { useLoadImage } from '@/hooks/useLoadImage';
import { useUploadImage } from '@/hooks/useUploadImage';
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
  const { onClose } = useAddIngredientModal();

  const { changeHandler, loading, error } = useUploadImage({
    setImage: setCover,
  });

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
        <div className="relative size-32">
          <div className="relative">
            <Image
              className={cn('size-32 object-cover', {
                'opacity-50': loading,
              })}
              src={cover}
              width={128}
              height={128}
              priority
              alt={getLocal('images.alt.avatar')}
            />
            {loading && <Spinner size="normal" position="absolute" />}
          </div>
          <Input
            id="cover"
            className="absolute inset-0 opacity-0"
            type="file"
            name="cover"
            accept="image/*"
            onChange={changeHandler}
            required={prevCover === IMAGE_PLACEHOLDER}
            disabled={loading}
          />
          {error && <span className="text-brand-danger">{error}</span>}
        </div>
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
      <Button.Submit formAction={recipe ? update : create} disabled={loading}>
        {getLocal('form.create')}
      </Button.Submit>
    </form>
  );
};
