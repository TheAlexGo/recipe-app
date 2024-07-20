'use server';

import { v4 as uuidv4 } from 'uuid';

import { Recipe, IRecipe, IRecipeDB } from '@/actions/models/Recipe';
import { createClient } from '@/utils/supabase/server';

const createInstance = () => {
  const supabase = createClient();
  return new Recipe(supabase);
};

export const uploadRecipeCover = async (file: File) => {
  const uniqueID = uuidv4();
  return createInstance().uploadImage(uniqueID, file);
};

export const deleteRecipeCover = async (filePath: string) => {
  return createInstance().deleteImage(filePath);
};

export const createRecipe = async (
  recipe: Omit<IRecipeDB, 'id' | 'user_id'>,
) => {
  return createInstance().insert(recipe);
};

export const updateRecipe = async (
  recipeId: IRecipeDB['id'],
  recipe: Omit<IRecipeDB, 'id' | 'user_id'>,
) => {
  return createInstance().update(recipeId, recipe);
};

export const updateCover = async (recipeId: IRecipeDB['id'], file: File) => {
  return createInstance().updateCover(recipeId, file);
};

export const getRandomRecipe = async () => {
  return createInstance().selectRandom();
};

export const getRecipeAll = async () => {
  return createInstance().selectAll();
};

export const getMyRecipeAll = async () => {
  return createInstance().selectAllByUserId();
};

export const getRecipe = async (recipeId: IRecipe['id']) => {
  return createInstance().selectFullData(recipeId);
};
