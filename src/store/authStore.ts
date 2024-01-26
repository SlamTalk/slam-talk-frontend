import { create } from 'zustand';
import LocalStorage from '@/utils/localstorage';
import axiosInstance, { storeAccessToken } from '@/app/api/axiosInstance';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  // isLoggedIn 값을 LocalStorage에서 가져와서 명시적으로 boolean으로 변환
  const isLoggedIn = LocalStorage.getItem('isLoggedIn') === 'true';

  return {
    accessToken: LocalStorage.getItem('slam') || null,
    isLoggedIn,
    setAccessToken: (token) => {
      if (token) {
        LocalStorage.setItem('slam', token);
        set({ accessToken: token, isLoggedIn: true });
        // isLoggedIn 값을 로컬 스토리지에 저장
        LocalStorage.setItem('isLoggedIn', 'true');
      } else {
        LocalStorage.removeItem('slam');
        set({ accessToken: null, isLoggedIn: false });
        // isLoggedIn 값을 로컬 스토리지에서 제거
        LocalStorage.removeItem('isLoggedIn');
      }
    },
    login: async (email, password) => {
      try {
        const response = await axiosInstance.post('/api/login', {
          email,
          password,
        });

        if (response.status === 200) {
          const { accessToken } = response.data;

          // 로그인 성공 시 토큰을 저장하고 상태를 업데이트
          storeAccessToken(accessToken);
          set({ accessToken, isLoggedIn: true });

          // isLoggedIn 값을 로컬 스토리지에 저장
          LocalStorage.setItem('isLoggedIn', 'true');
        }
      } catch (error) {
        // 에러 처리 로직
        console.error('로그인 실패:', error);
        throw error;
      }
    },
    logout: () => {
      // 로그아웃 처리 로직 추가
      // 예: 로그아웃 API 호출 후 setAccessToken 호출
      // 로그아웃 시 isLoggedIn 값을 false로 설정하고 로컬 스토리지에서 제거
      // set({ isLoggedIn: false });
      // LocalStorage.removeItem('isLoggedIn');
    },
  };
});

export default useAuthStore;
