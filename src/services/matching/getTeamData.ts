import axiosInstance from '@/app/api/axiosInstance';
import { TeamPost } from '@/types/matching/teamDataType';

export const fetchTeamData = async (): Promise<TeamPost[]> => {
  const response = await axiosInstance
    .get('/api/match/list')
    .then((res) => res.data.results.teamMatchingList);

  return response;
};
