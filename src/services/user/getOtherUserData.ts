import axiosInstance from '@/app/api/axiosInstance';
import { OtherUserInfo } from '@/types/user/otherUserInfo';

export interface GetOtherUserDataProps {
  userId: number;
}

export const getOtherUserData = async ({
  userId,
}: GetOtherUserDataProps): Promise<OtherUserInfo | null> => {
  const result = await axiosInstance.get(`/api/user/other-info/${userId}`);
  const user = result.data.results;

  const userData: OtherUserInfo = {
    id: user.id,
    nickname: user.nickname,
    socialType: user.socialType,
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
};
