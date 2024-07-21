import { SupabaseClient } from '@supabase/supabase-js';

import { BaseModel } from '@/actions/models/base';
import { IProductDB, IProductDBInFridge } from '@/types/db';
import { Database } from '@/types/supabase';
import { catchError } from '@/utils/decorators';

export class Product extends BaseModel<IProductDB> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'product', 'product_images');
  }

  private covertFridgeCount(
    product: (IProductDB & { fridge: { count: number }[] }) | null,
  ) {
    if (!product) {
      return null;
    }
    const { fridge, ...restParams } = product;
    return {
      ...restParams,
      count: fridge.length ? fridge[0].count : 0,
    };
  }

  @catchError
  async selectByCode(code: IProductDB['code']): Promise<IProductDB | null> {
    const { data, error } = await this.fromTable()
      .select(
        `
        *,
        fridge(count)
      `,
      )
      .eq('code', code)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return this.covertFridgeCount(data);
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

    return data?.map((product) => this.covertFridgeCount(product)!);
  }
}
