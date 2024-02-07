import axiosInstance from '@/app/api/axiosInstance';
import { UserInfo } from '@/types/user/userInfo';
import LocalStorage from '../../utils/localstorage';

export const getUserData = async (): Promise<UserInfo | null> => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    const result = await axiosInstance.get('/api/user/my-info');
    const user = result.data.results;

    const userData: UserInfo = {
      email: user.email,
      socialType: user.socialType,
      id: user.id,
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
    };
    return userData;
  }
  return null;
};
