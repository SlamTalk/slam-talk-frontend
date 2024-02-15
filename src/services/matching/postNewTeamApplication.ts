import { AxiosResponse } from 'axios';
import { TeamApplication } from '@/types/matching/teamDataType';
import axiosInstance from '@/app/api/axiosInstance';

export const postNewTeamApplication = async (
  newApplication: TeamApplication,
  teamPostId: string
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post<AxiosResponse>(
      `/api/match/${teamPostId}/apply`,
      newApplication
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
