export interface UserInfo {
  role: string;
  email: string;
  socialType: string;
  id: number;
  nickname: string;
  imageUrl: string | null;
  selfIntroduction: string | null;
  basketballSkillLevel: string | null;
  basketballPosition: string | null;
  level: number;
  levelScore: number;
  mateCompleteParticipationCount: number;
  teamMatchingCompleteParticipationCount: number;
}
