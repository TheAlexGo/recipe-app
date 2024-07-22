import { create } from 'zustand';

import { IProductDB } from '@/types/db';

interface IProductModalStore {
  isOpen: boolean;
  product: IProductDB | null;
  onOpen: (product: IProductDB) => void;
  onClose: () => void;
}

export const useProductModal = create<IProductModalStore>((set) => ({
  isOpen: false,
  product: null,
  onOpen: (product: IProductDB) => set({ isOpen: true, product }),
  onClose: () => set({ isOpen: false, product: null }),
}));
