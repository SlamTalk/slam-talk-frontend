export interface TeamApplied {
  teamApplicantTableId: number;
  applicantId: number;
  applicantNickname: string;
  applyStatus: string;
  teamName: string;
  skillLevel: string;
  teamMatchingId: number;
}

export interface TeamApplication {
  teamName: string;
  skillLevel: string;
}

export interface NewTeamData {
  teamName: string;
  title: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  locationDetail: string;
  numberOfMembers: string;
  skillLevel: string;
  content: string;
}

export interface TeamPost {
  teamMatchingId: number;
  teamName: string;
  title: string;
  writerId: number;
  writerNickname: string;
  writerImageUrl: string;
  content: string;
  locationDetail: string;
  numberOfMembers: string;
  skillLevel: string;
  skillLevelList: string[];
  scheduledDate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  recruitmentStatusType: string;
  teamApplicants: TeamApplied[];
}

export interface InfiniteTeamPost {
  nextCursor: string | null;
  teamMatchingList: TeamPost[];
}

export interface TeamData {
  success: boolean;
  status: number;
  message: string;
  results: TeamPost[];
}

export interface TeamCardInfo {
  title: string;
  teamName: string;
  date: string;
  startTime: string;
  location: string;
  level: string[];
  numberOfMembers: string;
  recruitmentStatusType: string;
}

export interface MyTeamMatchingInfo {
  teamMatchingId: number;
  title: string;
  location: string;
  startTime: string;
  recruitmentStatusType: string;
  applyStatusType: string | null;
}

export interface MyTeamMatching {
  authoredPost: MyTeamMatchingInfo[];
  participatedPost: MyTeamMatchingInfo[];
}
