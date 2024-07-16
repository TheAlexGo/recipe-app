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
  async selectAllRecipes() {
    const { data, error } = await this.fromTable().select(
      '...recipes!inner(*)',
    );

    if (error) {
      throw error;
    }

    return data as IRecipeDB[];
  }

  @catchError
  async selectByRecipeId(recipe_id: IRecipeDB['id']) {
    const { data, error } = await this.fromTable()
      .select('...recipes!inner(*)')
      .eq('recipe_id', recipe_id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data as IRecipeDB | null;
  }

  @catchError
  async deleteById(recipe_id: IFavoriteDB['id']): Promise<void> {
    const { error } = await this.fromTable()
      .delete()
      .eq('recipe_id', recipe_id);

    if (error) {
      throw error;
    }
  }
}
