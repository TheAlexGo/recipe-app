import { create } from 'zustand';

import { IProductDB } from '@/types/db';

export interface IAddIngredientModalStore {
  isOpen: boolean;
  product: IProductDB | null;
  onOpen: (options: {
    product: IProductDB;
    onSelect: IAddIngredientModalStore['onSelect'];
  }) => void;
  onClose: () => void;
  onSelect: (params: { product: IProductDB; count: number }) => void;
}

export const useAddIngredientModal = create<IAddIngredientModalStore>(
  (set) => ({
    isOpen: false,
    product: null,
    onOpen: ({ product, onSelect }) => set({ isOpen: true, product, onSelect }),
    onClose: () => set({ isOpen: false, product: null }),
    onSelect: () => undefined,
  }),
);
