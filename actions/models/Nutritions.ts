import { SupabaseClient } from '@supabase/supabase-js';
import { IconType } from 'react-icons';

import { BaseModel, ITableDB } from '@/actions/models/base';

export enum Units {
  KCAL = 'kcal',
  GRAM = 'g',
}

export enum NutritionTypes {
  CARBS = 'carbs',
  PROTEINS = 'proteins',
  KCAL = 'kcal',
  FATS = 'fats',
}

export interface INutritionDB extends ITableDB {
  type: NutritionTypes;
  unit: Units;
  value: number;
  recipe_id: string;
}

export interface INutrition extends INutritionDB {
  icon: IconType;
}

export class Nutritions extends BaseModel<INutritionDB> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'nutritions');
  }
}
