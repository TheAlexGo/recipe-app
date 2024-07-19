import { SupabaseClient } from '@supabase/supabase-js';

import { IRecipeDB } from '@/actions/models/Recipe';
import { BaseModel, ITableDB } from '@/actions/models/base';
import { catchError } from '@/utils/decorators';

export interface IFavoriteDB extends ITableDB {
  id: number;
  recipe_id: number;
}

export class Favorite extends BaseModel<IFavoriteDB> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'favorites');
  }

  @catchError
  async selectAllRecipes(): Promise<IRecipeDB[]> {
    const { data, error } = await this.fromTable().select(
      '...recipes!inner(*)',
    );

    if (error) {
      throw error;
    }

    return data;
  }

  @catchError
  async selectByRecipeId(
    recipe_id: IRecipeDB['id'],
  ): Promise<IRecipeDB | null> {
    const { data, error } = await this.fromTable()
      .select('...recipes!inner(*)')
      .eq('recipe_id', recipe_id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  @catchError
  async deleteByRecipeId(recipe_id: IFavoriteDB['id']): Promise<IFavoriteDB> {
    const { data, error } = await this.fromTable()
      .delete()
      .eq('recipe_id', recipe_id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}
