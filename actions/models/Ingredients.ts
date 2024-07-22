import { SupabaseClient } from '@supabase/supabase-js';

import { IRecipeDB } from '@/actions/models/Recipe';
import { BaseModel } from '@/actions/models/base';
import { getUser } from '@/actions/user';
import { IIngredientDB } from '@/types/db';
import { catchError } from '@/utils/decorators';

export class Ingredients extends BaseModel<IIngredientDB> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'ingredients');
  }

  @catchError
  async updateIngredients(
    recipe_id: IRecipeDB['id'],
    currentIngredients: Omit<IIngredientDB, 'id' | 'created_at' | 'user_id'>[],
  ) {
    const { error: deleteError } = await this.fromTable()
      .delete()
      .eq('recipe_id', recipe_id);

    if (deleteError) {
      throw deleteError;
    }

    const user = await getUser();
    const { error: addedError } = await this.fromTable().insert(
      currentIngredients.map((data) => ({
        ...data,
        recipe_id,
        user_id: user.id,
      })),
    );

    if (addedError) {
      throw addedError;
    }
  }
}
