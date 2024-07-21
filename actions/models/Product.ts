import { SupabaseClient } from '@supabase/supabase-js';

import { BaseModel } from '@/actions/models/base';
import { IProductDB, IProductDBInFridge } from '@/types/db';
import { Database } from '@/types/supabase';
import { catchError } from '@/utils/decorators';

export class Product extends BaseModel<IProductDB> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'product', 'product_images');
  }

  @catchError
  async selectByCode(code: IProductDB['code']): Promise<IProductDB> {
    const { data, error } = await this.fromTable()
      .select()
      .eq('code', code)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  @catchError
  async selectByBarcode(
    barcode: IProductDB['barcode'],
  ): Promise<IProductDB | null> {
    const { data, error } = await this.fromTable()
      .select()
      .eq('barcode', barcode)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  @catchError
  async selectAllInFridge(): Promise<IProductDBInFridge[]> {
    const { data, error } = await this.fromTable().select(`
      *,
      fridge!inner(count)
    `);

    if (error) {
      throw error;
    }

    return data;
  }
}
