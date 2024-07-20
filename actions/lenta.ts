'use sever';

import { IProductDB } from '@/types/db';

const { PROXY_URL, API_URL } = process.env;

export const getProductByBarcodeFromLenta = async (
  barcode: IProductDB['barcode'],
): Promise<IProductDB | null> => {
  const { skus } = await fetch(
    `${PROXY_URL}/${API_URL}/search?value=${barcode}&searchSource=Sku`,
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
  ).then((res) => res.json());

  if (!skus.length) {
    return null;
  }

  const { imageUrl, ...product } = skus[0];
  return {
    ...product,
    image_url: imageUrl,
  };
};
