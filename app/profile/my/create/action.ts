'use server';

import { revalidatePath } from 'next/cache';

import {
  createRecipe,
  updateRecipe,
  uploadRecipeCover,
} from '@/actions/impl/recipe';
import { IRecipeDB } from '@/actions/models/Recipe';

const prepareData = async (
  formData: FormData,
): Promise<Omit<IRecipeDB, 'id' | 'user_id'>> => {
  const title = formData.get('title') as string;
  const less_title = formData.get('less_title') as string;
  const description = formData.get('description') as string;
  const kcal = Number(formData.get('kcal'));
  const cooking_time = Number(formData.get('cooking_time'));
  const recipe_text = formData.get('recipe_text') as string;
  const cover = formData.get('cover') as File;

  const result = {
    title,
    less_title,
    description,
    kcal,
    cooking_time,
    recipe_text,
  } as Omit<IRecipeDB, 'id' | 'user_id'>;

  if (cover.size) {
    result.cover_url = await uploadRecipeCover(cover);
  }

  return result;
};

export const create = async (formData: FormData) => {
  await createRecipe(await prepareData(formData));

  revalidatePath('/');
};

export const update = async (formData: FormData) => {
  const idRaw = formData.get('recipeId');
  if (idRaw) {
    await updateRecipe(Number(idRaw), await prepareData(formData));
    revalidatePath('/');
  }
};
