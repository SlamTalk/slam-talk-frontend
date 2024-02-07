// export interface ResponseModel {
//   success: boolean;
//   status: number;
//   message: string;
//   results: {
//     matePostId: number;
//     writerId: number;
//     writerNickname: string;
//     title: string;
//     content: string;
//     scheduledDate: string;
//     startTime: string;
//     endTime: string;
//     locationDetail: string;
//     recruitmentStatus: string;
//     skillLevelList: string[];
//     positionList: Position[];
//     participants: Participant[];
//   };
// }

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
