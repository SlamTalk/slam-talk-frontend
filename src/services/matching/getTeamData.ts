import axiosInstance from '@/app/api/axiosInstance';
import { InfiniteTeamPost, TeamPost } from '@/types/matching/teamDataType';

export const fetchTeamData = async (): Promise<TeamPost[]> => {
  const response = await axiosInstance
    .get('/api/match/list')
    .then((res) => res.data.results.teamMatchingList);

  return response;
};

export const infiniteFetchTeamData = async (
  pageParams: string,
  selectedLevel: string,
  selectedCity: string,
  selectedNumberOfMembers: string,
  keywordProp: string | null
): Promise<InfiniteTeamPost> => {
  const response = await axiosInstance
    .get(
      `/api/match/list?cursorTime=${pageParams || ''}&skillLevel=${selectedLevel}&location=${selectedCity}&nov=${selectedNumberOfMembers}&searchWord=${keywordProp}`
    )
    .then((res) => res.data.results);

  return response;
};
