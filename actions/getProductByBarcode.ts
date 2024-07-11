'use server';

import { createClient } from '@/utils/supabase/server';

const { PROXY_URL } = process.env;
const { API_URL } = process.env;

export interface IProductApi {
  id: string;
  title: string;
  brand: string;
  imageUrl: string;
  code: string;
  barcode: string;
}

export interface IProductDB extends IProductApi {
  inFridge: {
    id: string;
  }[];
}

export interface IProduct extends IProductApi {}

export const getProductByBarcodeDB = async (
  barcode: string,
): Promise<IProduct | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('product')
    .select()
    .eq('barcode', barcode)
    .maybeSingle();

  if (!error && data) {
    return {
      ...data,
      imageUrl: data.image_url,
    };
  }
  return null;
};

export const getProductByBarcode = async (
  barcode: string,
): Promise<IProduct> => {
  return fetch(
    `${PROXY_URL}/${API_URL}/search?value=${barcode}&searchSource=Sku`,
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
  )
    .then((res) => res.json())
    .then((json) => json.skus[0]);
};
