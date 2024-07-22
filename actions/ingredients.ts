'use server';

import { Ingredients } from '@/actions/models/Ingredients';
import { IRecipeDB } from '@/actions/models/Recipe';
import { IIngredientDB } from '@/types/db';
import { createClient } from '@/utils/supabase/server';

const createInstance = () => {
  const supabase = createClient();
  return new Ingredients(supabase);
};

export const updateIngredients = async (
  recipeId: IRecipeDB['id'],
  currentIngredients: Omit<IIngredientDB, 'id' | 'created_at' | 'user_id'>[],
) => {
  return createInstance().updateIngredients(recipeId, currentIngredients);
};
