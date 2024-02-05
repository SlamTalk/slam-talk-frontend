import { create } from 'zustand';

export interface UserInfo {
  email: string;
  socialType: string;
  id: number;
  firstLoginCheck: boolean;
  nickname: string;
  imageUrl: string;
  selfIntroduction: string | null;
  basketballSkillLevel: string | null;
  basketballPosition: string | null;
  level: number;
  levelScore: number;
  mateCompleteParticipationCount: number;
  teamMatchingCompleteParticipationCount: number;
}

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  userInfo: {
    email: '',
    socialType: '',
    id: 0,
    firstLoginCheck: false,
    nickname: '',
    imageUrl: '',
    selfIntroduction: '',
    basketballSkillLevel: '',
    basketballPosition: '',
    level: 0,
    levelScore: 0,
    mateCompleteParticipationCount: 0,
    teamMatchingCompleteParticipationCount: 0,
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useAuthStore;
