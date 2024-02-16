import axiosInstance from '@/app/api/axiosInstance';
import { OtherUserInfo } from '@/types/user/otherUserInfo';
import LocalStorage from '../../utils/localstorage';

export interface GetOtherUserDataProps {
  userId: number;
}

export const getOtherUserData = async ({
  userId,
}: GetOtherUserDataProps): Promise<OtherUserInfo | null> => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    const result = await axiosInstance.get(`/api/user/${userId}/other-info`);
    const user = result.data.results;

    const userData: OtherUserInfo = {
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