'use server';

import { Fridge } from '@/actions/models/Fridge';
import { IProductDB } from '@/types/db';
import { createClient } from '@/utils/supabase/server';

const createInstance = () => {
  const supabase = createClient();
  return new Fridge(supabase);
};

export const updateProductInFridge = async (
  product_id: IProductDB['id'],
  count: number,
) => {
  if (count === 0) {
    return createInstance().deleteByProductId(product_id);
  }
  return createInstance().updateByProductId(product_id, {
    count,
  });
};
