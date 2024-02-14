export interface Position {
  position: string;
  maxPosition: number;
  currentPosition: number;
}

export interface Participant {
  participantTableId: number;
  participantId: number;
  participantNickname: string;
  applyStatus: string;
  position: string;
  skillLevel: string;
}

export interface ParticipantApplication {
  applyStatus: string;
  position: string;
  skillLevel: string;
}

export interface NewMateData {
  title: string;
  content: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  locationDetail: string;
  skillLevel: string;
  maxParticipantsCenters: number;
  maxParticipantsGuards: number;
  maxParticipantsForwards: number;
  maxParticipantsOthers: number;
}

export interface MatePost {
  matePostId: number;
  writerId: number;
  writerNickname: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  title: string;
  content: string;
  positionList: Position[];
  skillList: string[];
  recruitmentStatus: string;
  locationDetail: string;
  participants: Participant[];
  createdAt: string;
}

export interface MatePostLists {
  matePostList: MatePost[];
  nextCursor: string | null;
}

export interface MateData {
  success: boolean;
  status: number;
  message: string;
  results: MatePostLists;
}

export interface MateCardInfo {
  title: string;
  date: string;
  startTime: string;
  location: string;
  level: string[];
  positionNeeds: Position[];
}
