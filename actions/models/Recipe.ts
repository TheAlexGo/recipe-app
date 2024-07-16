import { SupabaseClient } from '@supabase/supabase-js';

import { IProductApi } from '@/actions/getProductByBarcode';
import { INutrition } from '@/actions/models/Nutritions';
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

export interface IRecipe extends IRecipeDB {
  nutritions: INutrition[];
  ingredients: IRecipeProduct[];
}

export class Recipe extends BaseModel<IRecipeDB> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'recipes', 'recipe_covers');
  }

  @catchError
  async selectFullData(recipeId: IRecipeDB['id']): Promise<IRecipe | null> {
    const { data, error } = await this.fromTable()
      .select('*, nutritions(*)')
      .eq('id', recipeId);

    const { data: productData, error: productError } = await this.supabase
      .from('product')
      .select(`*, count:ingredients!inner(id)`)
      .eq('ingredients.recipe_id', recipeId);

    if (error || productError) {
      throw error || productError;
    }

    const currentItem = data![0];

    if (!currentItem) {
      return null;
    }

    return {
      ...currentItem,
      ingredients: productData,
    };
  }
}
