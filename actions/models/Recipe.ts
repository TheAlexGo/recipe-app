import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

import { INutrition } from '@/actions/models/Nutritions';
import { BaseModel, ITableDB } from '@/actions/models/base';
import { IProductDB } from '@/types/db';
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

export interface IRecipeProduct extends IProductDB {
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
  async selectCover(recipeId: IRecipeDB['id']): Promise<string | null> {
    const { data, error } = await this.fromTable()
      .select('cover_url')
      .eq('id', recipeId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data?.cover_url || null;
  }

  @catchError
  async updateCover(recipeId: IRecipeDB['id'], file: File): Promise<string> {
    const oldCover = await this.selectCover(recipeId);
    if (oldCover) {
      await this.deleteImage(oldCover);
    }

    const uniqueID = uuidv4();
    return this.uploadImage(uniqueID, file);
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
