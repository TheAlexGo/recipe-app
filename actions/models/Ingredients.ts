import { SupabaseClient } from '@supabase/supabase-js';

import { IRecipeDB } from '@/actions/models/Recipe';
import { BaseModel, ITableDB } from '@/actions/models/base';
import { catchError } from '@/utils/decorators';

export interface IIngredientDB extends ITableDB {
  id: number;
  recipe_id: number;
  product_id: number;
}

export class Ingredients extends BaseModel<IIngredientDB> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'ingredients');
  }

  @catchError
  async updateIngredients(
    recipe_id: IRecipeDB['id'],
    currentIngredients: IIngredientDB['id'][],
  ) {
    const { error: deleteError } = await this.fromTable()
      .delete()
      .eq('recipe_id', recipe_id);

    if (deleteError) {
      throw deleteError;
    }

    const { error: addedError } = await this.fromTable().insert(
      currentIngredients.map((id) => ({
        recipe_id,
        product_id: id,
      })),
    );

    if (addedError) {
      throw addedError;
    }
  }
}
