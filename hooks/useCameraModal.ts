import { create } from 'zustand';

interface ICameraModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCameraModal = create<ICameraModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
