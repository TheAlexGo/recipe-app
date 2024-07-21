import { SupabaseClient } from '@supabase/supabase-js';

import { BaseModel } from '@/actions/models/base';
import { IFridgeDB, IProductDB } from '@/types/db';
import { Database } from '@/types/supabase';
import { catchError } from '@/utils/decorators';

export class Fridge extends BaseModel<IFridgeDB> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'fridge');
  }

  @catchError
  async updateByProductId(
    product_id: IProductDB['id'],
    fridgeItem: Partial<IFridgeDB>,
  ) {
    const { data, error } = await this.fromTable()
      .update(fridgeItem)
      .eq('product_id', product_id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  @catchError
  async deleteByProductId(product_id: IProductDB['id']) {
    const { data, error } = await this.fromTable()
      .delete()
      .eq('product_id', product_id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}
