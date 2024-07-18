'use server';

import { IIngredientDB, Ingredients } from '@/actions/models/Ingredients';
import { IRecipeDB } from '@/actions/models/Recipe';
import { createClient } from '@/utils/supabase/server';

const createInstance = () => {
  const supabase = createClient();
  return new Ingredients(supabase);
};

export const updateIngredients = async (
  recipeId: IRecipeDB['id'],
  currentIngredients: IIngredientDB['id'][],
) => {
  return createInstance().updateIngredients(recipeId, currentIngredients);
};
