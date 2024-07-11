import { getProducts } from '@/actions/fridge';
import { Chip } from '@/app/fridge/_components/Chip/Chip';

import { FridgeHeader } from './_components/FridgeHeader/FridgeHeader';

export default async function Fridge() {
  const products = await getProducts();
  return (
    <div>
      <FridgeHeader />
      <ul className="flex flex-col gap-y-3">
        {products.map((product) => (
          <li key={product.code}>
            <Chip {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
