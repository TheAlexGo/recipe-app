'use client';

import { ProductChip as Core } from './ProductChip';
import { ProductChipStub } from './ProductChipStub';

export const ProductChip = Object.assign(Core, {
  Stub: ProductChipStub,
});
