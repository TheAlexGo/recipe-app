'use server';

import { IProduct, IProductDB } from '@/actions/getProductByBarcode';
import { getUser } from '@/actions/getUser';
import logger from '@/utils/logger';
import { createClient } from '@/utils/supabase/server';

export const getProducts = async (): Promise<IProductDB[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.from('product').select(`
      id,
      title,
      code,
      image_url,
      brand,
      barcode,
      inFridge:fridge!inner(id)
    `);
  if (error) {
    throw new Error(`addProduct: ${error.message}`);
  }

  return data || [];
};

export const addProduct = async (productId: IProduct['id']) => {
  const supabase = createClient();
  const user = await getUser();

  const { error } = await supabase.from('fridge').insert({
    user_id: user.id,
    product_id: productId,
  });
  if (error) {
    throw new Error(`addProduct: ${error.message}`);
  }
};

export const removeProduct = async (productFridgeId: string) => {
  const supabase = createClient();

  const { error } = await supabase
    .from('fridge')
    .delete()
    .eq('id', productFridgeId)
    .select();
  if (error) {
    logger.log(`removeProduct: ${error.message}`);
  }
};
