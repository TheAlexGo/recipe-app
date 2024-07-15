import { SupabaseClient } from '@supabase/supabase-js';
import { MdOutlineGrass } from 'react-icons/md';
import { PiAvocado, PiPizza } from 'react-icons/pi';
import { TbCampfire } from 'react-icons/tb';

import { IProductApi } from '@/actions/getProductByBarcode';
import {
  INutrition,
  INutritionDB,
  NutritionTypes,
} from '@/actions/models/Nutritions';
import { BaseModel, ITableDB } from '@/actions/models/base';
import { catchError } from '@/utils/decorators';

export interface IRecipeDB extends ITableDB {
  id: number;
  cover_url: string;
  title: string;
  less_title: string;
  description: string;
  kcal: number;
  cooking_time: number;
  recipe_text: string;
}

export interface IRecipeProduct extends IProductApi {
  count: { id: string }[];
}

export interface IRecipe extends Omit<IRecipeDB, 'user_id'> {
  nutritions: INutrition[];
  ingredients: IRecipeProduct[];
}

export class Recipe extends BaseModel<IRecipeDB> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'recipes', 'recipe_covers');
  }

  @catchError
  async selectFullData(recipeId: IRecipeDB['id']): Promise<IRecipe> {
    const { data, error } = await this.fromTable()
      .select('*, nutritions(*)')
      .eq('id', recipeId);

    const { data: productData, error: productError } = await this.supabase
      .from('product')
      .select(`*, count:ingredients!inner(id)`);

    if (error || productError) {
      throw error || productError;
    }

    const currentItem = data![0];

    return {
      ...currentItem,
      nutritions: currentItem.nutritions.map((nutrition: INutritionDB) => {
        let icon;
        switch (nutrition.type) {
          case NutritionTypes.CARBS:
            icon = MdOutlineGrass;
            break;
          case NutritionTypes.PROTEINS:
            icon = PiAvocado;
            break;
          case NutritionTypes.KCAL:
            icon = TbCampfire;
            break;
          case NutritionTypes.FATS:
            icon = PiPizza;
            break;
          default:
            break;
        }
        return {
          ...nutrition,
          icon,
        };
      }),
      ingredients: productData,
    };
  }
}
