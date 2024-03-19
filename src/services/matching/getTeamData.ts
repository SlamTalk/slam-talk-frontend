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
  let queryParams = `/api/match/list?cursorTime=${pageParams || ''}`;

  if (selectedLevel) {
    queryParams += `&skillLevel=${selectedLevel}`;
  }
  if (selectedCity) {
    queryParams += `&location=${selectedCity}`;
  }
  if (selectedNumberOfMembers) {
    queryParams += `&nov=${selectedNumberOfMembers}`;
  }
  if (keywordProp) {
    queryParams += `&searchWord=${keywordProp}`;
  }

  const response = await axiosInstance
    .get(queryParams)
    .then((res) => res.data.results);

  return response;
};
