import { create } from 'zustand';

interface LocationState {
  userLocation: { latitude: number; longitude: number } | null;
  userAddress: string;
  setUserLocation: (location: { latitude: number; longitude: number }) => void;
  setUserAddress: (address: string) => void;
}

const userLocationStore = create<LocationState>((set) => ({
  userLocation: null,
  userAddress: '',
  setUserLocation: (location: { latitude: number; longitude: number }) =>
    set({ userLocation: location }),
  setUserAddress: (address: string) => set({ userAddress: address }),
}));

export default userLocationStore;
