import { INutrition, Nutritions } from '@/actions/models/Nutritions';
import { createClient } from '@/utils/supabase/server';

const createInstance = () => {
  const supabase = createClient();
  return new Nutritions(supabase);
};

export const createNutrition = async (
  nutrition: Omit<INutrition, 'id' | 'user_id'>,
) => {
  return createInstance().insert(nutrition);
};
