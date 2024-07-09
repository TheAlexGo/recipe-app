import { FridgeItems } from '@/app/fridge/_components/FridgeItems/FridgeItems';

import { FridgeHeader } from './_components/FridgeHeader/FridgeHeader';

export default function Fridge() {
  return (
    <div>
      <FridgeHeader />
      <FridgeItems />
    </div>
  );
}
