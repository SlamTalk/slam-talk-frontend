export interface UserInfo {
  email: string;
  socialType: string;
  id: number;
  // firstLoginCheck: boolean;
  nickname: string;
  imageUrl: string;
  selfIntroduction: string | null;
  basketballSkillLevel: string | null;
  basketballPosition: string | null;
  level: number;
  levelScore: number;
  mateCompleteParticipationCount: number;
  teamMatchingCompleteParticipationCount: number;
  accessToken: string | null;
}
