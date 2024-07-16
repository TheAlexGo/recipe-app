'use client';

import { FC, JSX, useState } from 'react';

import Image from 'next/image';

import { IRecipe } from '@/actions/models/Recipe';
import { create, update } from '@/app/profile/my/create/action';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useLoadImage } from '@/hooks/useLoadImage';
import { useUploadImage } from '@/hooks/useUploadImage';
import { IMAGE_PLACEHOLDER } from '@/utils/image';
import { getLocal } from '@/utils/local';

interface IRecipeForm {
  recipe?: IRecipe;
}

export const RecipeForm: FC<IRecipeForm> = ({ recipe }): JSX.Element => {
  const prevCover = useLoadImage('recipe_covers', recipe?.cover_url);
  const [cover, setCover] = useState<string>(prevCover || IMAGE_PLACEHOLDER);

  const { changeHandler } = useUploadImage({
    setImage: setCover,
  });

  return (
    <form className="flex flex-col gap-y-3">
      {recipe && (
        <Input
          className="hidden"
          type="text"
          name="recipeId"
          defaultValue={recipe.id}
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
        />
      </label>
      <label htmlFor="less_title">
        <span>{getLocal('form.less_title.label')}</span>
        <Input
          id="less_title"
          type="text"
          name="less_title"
          defaultValue={recipe?.less_title}
        />
      </label>
      <label htmlFor="description">
        <span>{getLocal('form.description.label')}</span>
        <Input.TextArea
          id="description"
          name="description"
          rows={3}
          defaultValue={recipe?.description}
        />
      </label>
      <label htmlFor="kcal">
        <span>{getLocal('form.kcal.label')}</span>
        <Input id="kcal" type="text" name="kcal" defaultValue={recipe?.kcal} />
      </label>
      <label htmlFor="cooking_time">
        <span>{getLocal('form.cooking_time.label')}</span>
        <Input
          id="cooking_time"
          type="text"
          name="cooking_time"
          defaultValue={recipe?.cooking_time}
        />
      </label>
      <label htmlFor="recipe_text">
        <span>{getLocal('form.recipe_text.label')}</span>
        <Input.TextArea
          id="recipe_text"
          name="recipe_text"
          rows={5}
          defaultValue={recipe?.recipe_text}
        />
      </label>
      <label htmlFor="cover">
        <span>{getLocal('form.cover.label')}</span>
        <Image
          className="size-32 object-cover"
          src={cover}
          width={128}
          height={128}
          priority
          alt={getLocal('images.alt.avatar')}
        />
        <Input
          id="cover"
          className="hidden"
          type="file"
          name="cover"
          accept="image/*"
          onChange={changeHandler}
        />
      </label>
      <Button.Submit formAction={recipe ? update : create}>
        {getLocal('form.create')}
      </Button.Submit>
    </form>
  );
};
