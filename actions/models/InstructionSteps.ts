import { SupabaseClient } from '@supabase/supabase-js';

import { IRecipeDB } from '@/actions/models/Recipe';
import { BaseModel } from '@/actions/models/base';
import { getUser } from '@/actions/user';
import { IStepDB } from '@/types/db';
import { catchError } from '@/utils/decorators';

export class InstructionSteps extends BaseModel<IStepDB> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'steps', 'steps_images');
  }

  @catchError
  async updateSteps(
    recipe_id: IRecipeDB['id'],
    currentSteps: Omit<
      Partial<IStepDB>,
      'id' | 'created_at' | 'user_id' | 'recipe_id'
    >[],
  ) {
    const { error: deleteError } = await this.fromTable()
      .delete()
      .eq('recipe_id', recipe_id);

    if (deleteError) {
      throw deleteError;
    }

    const user = await getUser();
    const { error: addedError } = await this.fromTable().insert(
      currentSteps.map((data) => ({
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
