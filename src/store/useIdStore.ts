import { create } from 'zustand';

interface useIdStoreState {
  id: string | null;
  setId: (newId: string) => void;
  reset: () => void;
}

const useIdStore = create<useIdStoreState>((set) => ({
  id: null,
  setId: (newId) => set({ id: newId }),
  reset: () => set({ id: null }),
}));

export default useIdStore;
