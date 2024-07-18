'use server';

import { redirect } from 'next/navigation';

import { updateIngredients } from '@/actions/ingredients';
import { IRecipeDB } from '@/actions/models/Recipe';
import {
  createRecipe,
  deleteRecipeCover,
  updateRecipe,
  uploadRecipeCover,
} from '@/actions/recipe';

const prepareData = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const less_title = formData.get('less_title') as string;
  const description = formData.get('description') as string;
  const kcal = Number(formData.get('kcal'));
  const cooking_time = Number(formData.get('cooking_time'));
  const recipe_text = formData.get('recipe_text') as string;
  const cover = formData.get('cover') as File;
  const ingredients = formData.getAll('product') as string[];

  const result = {
    title,
    less_title,
    description,
    kcal,
    cooking_time,
    recipe_text,
    ingredients,
  } as Omit<IRecipeDB, 'id' | 'user_id'> & {
    ingredients: string[];
  };

  if (cover.size) {
    result.cover_url = await uploadRecipeCover(cover);
  }

  return result;
};

export const create = async (formData: FormData) => {
  const { ingredients, ...data } = await prepareData(formData);
  const { id } = await createRecipe(data);
  await updateIngredients(
    id,
    ingredients.map((id) => Number(id)),
  );

  redirect(`/recipe/${id}`);
};

export const update = async (formData: FormData) => {
  const idRaw = formData.get('recipeId');
  if (idRaw) {
    const id = Number(idRaw);
    const oldCover = formData.get('oldCover') as string;
    const { ingredients, ...data } = await prepareData(formData);

    deleteRecipeCover(oldCover);
    await updateRecipe(id, data);
    await updateIngredients(
      id,
      ingredients.map((id) => Number(id)),
    );
    redirect(`/recipe/${idRaw}`);
  }
};
