import { create } from 'zustand';

import { IProduct } from '@/actions/getProductByBarcode';

interface IFridgeStore {
  items: IProduct[];
  addItem: (product: IProduct) => void;
}

export const useFridge = create<IFridgeStore>((set) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      const existedProduct = state.items.find(
        (item) => item.code === product.code,
      );
      if (existedProduct) {
        return {
          items: state.items.map((item) => {
            if (item.code === product.code) {
              return {
                ...item,
                count: item.count + 1,
              };
            }
            return {
              ...item,
            };
          }),
        };
      }
      return {
        items: [
          ...state.items,
          {
            ...product,
            count: 1,
          },
        ],
      };
    });
  },
}));
