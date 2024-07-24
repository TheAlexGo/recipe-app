'use client';

import { ChipAddButton } from './ChipAddButton';
import { ChipCounter } from './ChipCounter';
import { ChipInput } from './ChipInput';
import { ChipRemoveButton } from './ChipRemoveButton';
import { ProductChip as Core } from './ProductChip';
import { ProductChipStub } from './ProductChipStub';

export const ProductChip = Object.assign(Core, {
  Stub: ProductChipStub,
  Counter: ChipCounter,
  Add: ChipAddButton,
  Remove: ChipRemoveButton,
  Input: ChipInput,
});
