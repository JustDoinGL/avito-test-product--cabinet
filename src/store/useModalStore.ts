import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
}));

export default useModalStore;
