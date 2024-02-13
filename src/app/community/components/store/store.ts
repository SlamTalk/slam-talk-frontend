import { create } from 'zustand';

interface StoreState {
  searchKey: string;
  setSearchKey: (newValue: string) => void;
}

const useStore = create<StoreState>((set) => ({
  searchKey: '',
  setSearchKey: () => set((newValue: string) => ({ searchKey: newValue })),
}));

export default useStore;
