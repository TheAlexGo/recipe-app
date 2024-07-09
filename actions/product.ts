'use server';

import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '@/actions/getProductByBarcode';
import { getUser } from '@/actions/getUser';
import { createClient } from '@/utils/supabase/server';

export const createProduct = async (
  product: Omit<IProduct, 'count' | 'id'>,
) => {
  const { imageUrl, ...restProductData } = product;
  const supabase = createClient();
  const user = await getUser();

  const { error } = await supabase.from('product').insert({
    ...restProductData,
    user_id: user.id,
    image_url: imageUrl,
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.log(`createProduct: ${error.message}`);
  }

  return product;
};

export const downloadImage = async (imageUrl: string): Promise<Blob> => {
  const response = await fetch(`${process.env.PROXY_URL}/${imageUrl}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  return response.blob();
};

export const uploadProductImage = async (
  imageName: string,
  imageUrl: string,
) => {
  const imageBlob = await downloadImage(imageUrl);
  const uniqueID = uuidv4();
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from('product_images')
    .upload(`${imageName}-${uniqueID}`, imageBlob, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    // eslint-disable-next-line no-console
    console.log(`uploadProductImage: ${error.message}`);
    return null;
  }

  return data;
};
