import { getProductInFridge } from '@/actions/product';
import { Chip } from '@/app/fridge/_components/Chip/Chip';

import { FridgeHeader } from './_components/FridgeHeader/FridgeHeader';

export default async function Fridge() {
  const products = await getProductInFridge();
  return (
    <div>
      <FridgeHeader />
      <ul className="flex flex-col gap-y-3">
        {products.map((product) => (
          <li key={product.code}>
            <Chip {...product} count={product.fridge[0].count} />
          </li>
        ))}
      </ul>
    </div>
  );
}
