import { TeamPost } from '@/types/matching/teamDataType';
import { MatePost } from '@/types/matching/mateDataType';

export interface Schedule {
  postId: number;
  scheduledDate: string;
  startTime: string;
  title: string;
  locationDetail: string;
  source: 'team' | 'mate';
}

export interface CommonScheduleFields {
  scheduledDate: string;
  startTime: string;
  title: string;
  locationDetail: string;
}

export type ScheduleItem =
  | (CommonScheduleFields & { teamMatchingId: number })
  | (CommonScheduleFields & { matePostId: number });

export interface ScheduleResponse {
  message: string;
  results: {
    teamMatchingList: TeamPost[];
    mateList: MatePost[];
  };
  status: number;
  success: boolean;
}
