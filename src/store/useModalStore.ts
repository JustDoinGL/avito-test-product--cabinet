import { create } from 'zustand';

type TCurrentModal = 'order' | 'advertisement' | 'orderFilters' | 'advertisementFilters';

type ModalStore = {
  isOpen: boolean;
  currentModal: TCurrentModal | null;
  setOpen: (isOpen: boolean, modal: TCurrentModal) => void;
  reset: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  currentModal: null,

  setOpen: (isOpen, modal) => {
    if (isOpen) {
      set({ isOpen: true, currentModal: modal });
    } else {
      set({ isOpen: false, currentModal: null });
    }
  },

  reset: () => set({ isOpen: false, currentModal: null }),
}));

export default useModalStore;
