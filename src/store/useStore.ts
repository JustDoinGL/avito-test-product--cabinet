import { TAdvertisement } from 'types/Advertisement';
import { create } from 'zustand';

type GlobalStore = {
  isOpen: boolean;
  id: string | null;
  advertisementData: TAdvertisement | null;
  setId: (id: string | null) => void;
  setOpen: (isOpen: boolean) => void;
  setAdvertisementData: (advertisementData: TAdvertisement | null) => void;
};

const useGlobalStore = create<GlobalStore>((set) => ({
  isOpen: false,
  id: null,
  advertisementData: null,
  setId: (id: string | null) => set({ id }),
  setOpen: (isOpen) => set({ isOpen }),
  setAdvertisementData: (advertisementData: TAdvertisement | null) => set({ advertisementData }),
}));

export default useGlobalStore;
