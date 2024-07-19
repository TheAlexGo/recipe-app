'use server';

import { Fridge } from '@/actions/models/Fridge';
import { IFridgeDB, IProductDB } from '@/types/db';
import { createClient } from '@/utils/supabase/server';

const createInstance = () => {
  const supabase = createClient();
  return new Fridge(supabase);
};

export const addProductInFridge = async (product_id: IProductDB['id']) => {
  return createInstance().insert({
    product_id,
  });
};

export const removeProductFromFridge = async (id: IFridgeDB['id']) => {
  return createInstance().deleteById(id);
};
