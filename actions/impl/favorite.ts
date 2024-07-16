'use server';

import { revalidatePath } from 'next/cache';

import { Favorite } from '@/actions/models/Favorite';
import { IRecipeDB } from '@/actions/models/Recipe';
import { createClient } from '@/utils/supabase/server';

const createInstance = () => {
  const supabase = createClient();
  return new Favorite(supabase);
};

export const addToFavorite = async (recipe_id: IRecipeDB['id']) => {
  const result = await createInstance().insert({ recipe_id });
  revalidatePath('/');
  return result;
};

export const removeFromFavorite = async (recipe_id: IRecipeDB['id']) => {
  const result = createInstance().deleteById(recipe_id);
  revalidatePath('/');
  return result;
};

export const getFavoriteRecipes = async () => {
  return createInstance().selectAllRecipes();
};

export const getFavoriteByRecipeId = async (recipe_id: IRecipeDB['id']) => {
  return createInstance().selectByRecipeId(recipe_id);
};

export const isFavoriteRecipe = async (recipe_id: IRecipeDB['id']) => {
  return Boolean(await getFavoriteByRecipeId(recipe_id));
};

export const getFavoriteRecipesAsObject = async () => {
  return (await createInstance().selectAllByUserId()).reduce<
    Record<IRecipeDB['id'], number>
  >((res, item) => {
    res[item.recipe_id] = item.id;
    return res;
  }, {});
};
