import { TAdvertisement } from 'types/Advertisement';
import { create } from 'zustand';

type GlobalStore = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  advertisementData: TAdvertisement | null;
  setAdvertisementData: (advertisementData: TAdvertisement) => void;
};

const useGlobalStore = create<GlobalStore>((set) => ({
  isOpen: false,
  advertisementData: null,
  setOpen: (isOpen) => set({ isOpen }),
  setAdvertisementData: (advertisementData: TAdvertisement) => set({ advertisementData }),
}));

export default useGlobalStore;
