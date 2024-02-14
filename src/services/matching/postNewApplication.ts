import { AxiosResponse } from 'axios';
import { ParticipantApplication } from '@/app/matching/components/MateDataType';
import axiosInstance from '@/app/api/axiosInstance';

export const postNewApplication = async (
  newApplication: ParticipantApplication,
  matePostId: string
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post<AxiosResponse>(
      `/api/mate/${matePostId}/participants/register`,
      newApplication
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
