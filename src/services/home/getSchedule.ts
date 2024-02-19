import axiosInstance from '@/app/api/axiosInstance';
import { ScheduleResponse } from '@/types/home/scheduleType';

export const fetchScheduleList = async (): Promise<
  ScheduleResponse['results']
> => {
  const { data } = await axiosInstance.get<ScheduleResponse>(
    '/api/user/scheduleList'
  );

  return data.results;
};
