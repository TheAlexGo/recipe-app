'use server';

import { IProduct, IProductApi } from '@/actions/getProductByBarcode';
import { createClient } from '@/utils/supabase/server';

export const createProduct = async (
  product: Omit<IProduct, 'count' | 'id'>,
): Promise<IProductApi> => {
  const { image_url, ...restProductData } = product;
  const supabase = createClient();

  const { data, error } = await supabase
    .from('product')
    .insert({
      ...restProductData,
      image_url,
    })
    .select(
      `
      id,
      title,
      code,
      image_url,
      brand,
      barcode
    `,
    )
    .single();

  if (error) {
    throw new Error(`createProduct: ${error.message}`);
  }

  return data;
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
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from('product_images')
    .upload(imageName, imageBlob, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error(`uploadProductImage: ${error.message}`);
  }

  return data;
};
