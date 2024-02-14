export interface TeamApplied {
  teamApplicantTableId: number;
  applicantId: number;
  applicantNickname: string;
  chatroomId: number;
  applyStatusType: string;
  teamName: string;
  skillLevel: string;
  teamMatchingId: number;
}

export interface NewTeamData {
  teamName: string;
  title: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  locationDetail: string;
  numberOfMembers: number;
  skillLevel: string;
  content: string;
}

export interface TeamPost {
  teamMatchingId: number;
  teamName: string;
  nickname: string;
  title: string;
  writerId: number;
  content: string;
  locationDetail: string;
  numberOfMembers: number;
  skillLevel: string[];
  scheduledDate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  recruitmentStatusType: string;
  teamApplicantsDto: TeamApplied[];
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
  numberOfMembers: number;
}
