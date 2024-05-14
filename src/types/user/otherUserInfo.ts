export interface OtherUserInfo {
  id: number;
  nickname: string;
  imageUrl: string | null;
  socialType: string;
  selfIntroduction: string | null;
  basketballSkillLevel: string | null;
  basketballPosition: string | null;
  level: number;
  levelScore: number;
  mateCompleteParticipationCount: number;
  teamMatchingCompleteParticipationCount: number;
}
