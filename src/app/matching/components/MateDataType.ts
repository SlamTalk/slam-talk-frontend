export interface Position {
  position: string;
  maxPosition: number;
  currentPosition: number;
}

export interface Participant {
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  participantTableId: number;
  participantId: number;
  applyStatus: string;
  position: string;
  skillLevel: string;
}

export interface MateData {
  success: boolean;
  status: number;
  message: string;
  results: {
    matePostList: {
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
    }[];
    nextCursor: string;
  };
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

export interface MateCardInfo {
  title: string;
  date: string;
  startTime: string;
  location: string;
  level: string[];
  positionNeeds: Position[];
}
