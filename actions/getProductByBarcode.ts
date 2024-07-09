const PROXY = 'https://cors-anywhere.thealexgo.ru';
const API_URL = 'https://lenta.com/api/v1';

export interface IProductApi {
  title: string;
  brand: string;
  imageUrl: string;
  code: string;
}

export interface IProduct extends IProductApi {
  count: number;
}

export const getProductByBarcode = async (
  barcode: string,
): Promise<IProduct> => {
  return fetch(`${PROXY}/${API_URL}/search?value=${barcode}&searchSource=Sku`)
    .then((res) => res.json())
    .then((json) => json.skus[0]);
};
