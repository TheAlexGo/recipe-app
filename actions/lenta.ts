'use sever';

import { IProductDB } from '@/types/db';

const { PROXY_URL, API_URL } = process.env;

export const getProductByBarcodeFromLenta = async (
  barcode: IProductDB['barcode'],
) => {
  return fetch(
    `${PROXY_URL}/${API_URL}/search?value=${barcode}&searchSource=Sku`,
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
  )
    .then((res) => res.json())
    .then((json) => json.skus[0])
    .then((res) => {
      if (res) {
        const { imageUrl, ...product } = res;
        return {
          ...product,
          image_url: imageUrl,
        };
      }
      return null;
    });
};
