'use server';

import { getProductByBarcodeFromLenta } from '@/actions/lenta';
import { Product } from '@/actions/models/Product';
import { IProductDB } from '@/types/db';
import { downloadImage } from '@/utils/image';
import logger from '@/utils/logger';
import { createClient } from '@/utils/supabase/server';

const { PROXY_URL, API_URL } = process.env;

const createInstance = () => {
  const supabase = createClient();
  return new Product(supabase);
};

export const createProduct = async (
  product: Omit<IProductDB, 'id' | 'user_id'>,
): Promise<IProductDB> => {
  return createInstance().insert(product);
};

export const uploadProductImage = async (
  imageName: string,
  imageUrl: string,
) => {
  const imageBlob = await downloadImage(imageUrl);
  const imageFile = new File([imageBlob], imageName, {
    type: 'image/webp',
  });

  return createInstance().uploadImage(imageName, imageFile);
};

const getAndSaveProductByBarcodeFromLenta = async (
  barcode: IProductDB['barcode'],
): Promise<IProductDB | null> => {
  const productFromLenta = await getProductByBarcodeFromLenta(barcode);
  if (!productFromLenta) {
    return null;
  }

  const image_url = await uploadProductImage(
    `${productFromLenta.code}-cover`,
    productFromLenta.image_url,
  );

  if (!image_url) {
    throw new Error('При загрузке изображения произошла ошибка');
  }

  return createProduct({
    title: productFromLenta.title,
    code: productFromLenta.code,
    brand: productFromLenta.brand,
    image_url,
    barcode,
  });
};

export const getProductByCode = async (code: IProductDB['code']) => {
  return createInstance().selectByCode(code);
};

export const getProductByBarcode = async (
  barcode: IProductDB['barcode'],
): Promise<IProductDB | null> => {
  const existedProduct = await createInstance().selectByBarcode(barcode);
  if (existedProduct) {
    return existedProduct;
  }

  return getAndSaveProductByBarcodeFromLenta(barcode);
};

export const getProductInFridge = async () => {
  return createInstance().selectAllInFridge();
};

export const searchInLenta = async (productName: string) => {
  const { skus } = await fetch(
    `${PROXY_URL}/${API_URL}/search?value=${productName}&searchSource=Sku`,
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
  ).then((res) => res.json());

  const result = await Promise.all(
    skus.map(async (product: IProductDB) => {
      const productExist = getProductByCode(product.code);
      if (productExist) {
        return productExist;
      }

      const imagePath = await uploadProductImage(
        `${product.code}-cover`,
        product.image_url,
      );

      if (!imagePath) {
        throw new Error('При загрузке изображения произошла ошибка');
      }

      return await createProduct({
        title: product.title,
        code: product.code,
        brand: product.brand,
        image_url: imagePath,
        barcode: '',
      });
    }),
  );

  logger.log(result);

  return result;
};
