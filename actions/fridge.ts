'use server';

import { IProduct } from '@/actions/getProductByBarcode';
import { getUser } from '@/actions/getUser';
import logger from '@/utils/logger';
import { createClient } from '@/utils/supabase/server';

export const getProducts = async (): Promise<IProduct[]> => {
  const supabase = createClient();
  const user = await getUser();

  const { data, error } = await supabase
    .from('product')
    .select('*, fridge!inner(user_id)')
    .eq('fridge.user_id', user.id);
  if (error) {
    logger.log(`addProduct: ${error.message}`);
  }

  return (
    data?.map((item) => ({
      id: item.id,
      title: item.title,
      code: item.code,
      brand: item.brand,
      barcode: item.barcode,
      imageUrl: item.image_url,
      count: item.fridge.length,
    })) || []
  );
};

export const addProduct = async (productId: IProduct['id']) => {
  const supabase = createClient();
  const user = await getUser();

  const { error } = await supabase.from('fridge').insert({
    user_id: user.id,
    product_id: productId,
  });
  if (error) {
    logger.log(`addProduct: ${error.message}`);
  }
};

export const removeProduct = async (productId: IProduct['id']) => {
  const supabase = createClient();
  const user = await getUser();

  const { error } = await supabase
    .from('fridge')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId);
  if (error) {
    // eslint-disable-next-line no-console
    console.log(`addProduct: ${error.message}`);
  }
};
