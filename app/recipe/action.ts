'use server';

import { redirect } from 'next/navigation';

import { updateIngredients } from '@/actions/ingredients';
import { IRecipeDB } from '@/actions/models/Recipe';
import {
  createRecipe,
  updateCover,
  updateRecipe,
  uploadRecipeCover,
} from '@/actions/recipe';
import { IIngredientDB } from '@/types/db';

const prepareData = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const less_title = formData.get('less_title') as string;
  const description = formData.get('description') as string;
  const kcal = Number(formData.get('kcal'));
  const cooking_time = Number(formData.get('cooking_time'));
  const recipe_text = formData.get('recipe_text') as string;
  const cover = formData.get('cover') as File;
  const ingredientIds = formData.getAll('productId') as string[];
  const ingredientCounts = formData.getAll('productCount') as string[];

  const result = {
    title,
    less_title,
    description,
    kcal,
    cooking_time,
    recipe_text,
    ingredients: ingredientIds.map((id, index) => ({
      product_id: Number(id),
      count: Number(ingredientCounts[index]),
    })),
    cover: null,
  } as Omit<IRecipeDB, 'id' | 'user_id'> & {
    ingredients: IIngredientDB[];
    cover: File | null;
  };

  if (cover.size) {
    Object.assign(result, {
      cover,
    });
  }

  return result;
};

export const create = async (formData: FormData) => {
  const { ingredients, cover, ...data } = await prepareData(formData);

  if (cover) {
    Object.assign(data, {
      cover_url: await uploadRecipeCover(cover),
    });
  }

  const { id } = await createRecipe(data);
  await updateIngredients(id, ingredients);

  redirect(`/recipe/${id}`);
};

export const update = async (formData: FormData) => {
  const idRaw = formData.get('recipeId');
  if (idRaw) {
    const id = Number(idRaw);

    const { ingredients, cover, ...data } = await prepareData(formData);

    if (cover) {
      Object.assign(data, {
        cover_url: await updateCover(id, cover),
      });
    }

    await Promise.all([
      updateRecipe(id, data),
      updateIngredients(id, ingredients),
    ]);

    redirect(`/recipe/${idRaw}`);
  }
};
