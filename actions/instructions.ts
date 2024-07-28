import { v4 as uuidv4 } from 'uuid';

import { InstructionSteps } from '@/actions/models/InstructionSteps';
import { IRecipeDB } from '@/actions/models/Recipe';
import { IStepDB } from '@/types/db';
import { createClient } from '@/utils/supabase/server';

const createInstance = () => {
  const supabase = createClient();
  return new InstructionSteps(supabase);
};

export const updateSteps = async (
  recipeId: IRecipeDB['id'],
  currentIngredients: Omit<
    Partial<IStepDB>,
    'id' | 'created_at' | 'user_id' | 'recipe_id'
  >[],
) => {
  return createInstance().updateSteps(recipeId, currentIngredients);
};

export const uploadImageStep = async (file: File) => {
  const uniqueID = uuidv4();
  return createInstance().uploadImage(uniqueID, file);
};
