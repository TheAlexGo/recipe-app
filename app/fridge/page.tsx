import { getProductInFridge } from '@/actions/product';
import { ProductFridgeChip } from '@/app/_components/ProductFridgeChip/ProductFridgeChip';

import { FridgeHeader } from './_components/FridgeHeader/FridgeHeader';

export default async function Fridge() {
  const products = await getProductInFridge();
  return (
    <div>
      <FridgeHeader />
      <ul className="flex flex-col gap-y-3">
        {products.map((product) => (
          <li key={product.code}>
            <ProductFridgeChip {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
