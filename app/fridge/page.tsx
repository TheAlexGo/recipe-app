import { getProducts } from '@/actions/fridge';
import { FridgeItems } from '@/app/fridge/_components/FridgeItems/FridgeItems';

import { FridgeHeader } from './_components/FridgeHeader/FridgeHeader';

export default async function Fridge() {
  const products = await getProducts();
  return (
    <div>
      <FridgeHeader />
      <FridgeItems initialItems={products} />
    </div>
  );
}
