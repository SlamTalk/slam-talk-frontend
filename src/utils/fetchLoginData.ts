import axiosInstance from '@/app/api/axiosInstance';
import { UserInfo } from '@/types/userInfo';
import LocalStorage from './localstorage';

export const fetchLoginData = async (): Promise<UserInfo | null> => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    const result = await axiosInstance.patch('/api/tokens/refresh');
    const user = result.data.results;
    const accessToken = result.headers.authorization;

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const userData: UserInfo = {
      email: user.email,
      socialType: user.socialType,
      id: user.id,
      // firstLoginCheck: user.firstLoginCheck,
      nickname: user.nickname,
      imageUrl: user.imageUrl,
      selfIntroduction: user.selfIntroduction,
      basketballSkillLevel: user.basketballSkillLevel,
      basketballPosition: user.basketballPosition,
      level: user.level,
      levelScore: user.levelScore,
      mateCompleteParticipationCount: user.mateCompleteParticipationCount,
      teamMatchingCompleteParticipationCount:
        user.teamMatchingCompleteParticipationCount,
      accessToken,
    };

    console.log(userData);
    return userData;
  }
  return null;
};
