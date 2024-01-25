import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isLoggedIn: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));

export default useAuthStore;
