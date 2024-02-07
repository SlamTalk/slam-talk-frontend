import axiosInstance from '@/app/api/axiosInstance';
import { AxiosResponse } from 'axios';
import { NewMateData } from '@/types/matching/mateNewPostType';

export const createMatePost = async (
  newMateData: NewMateData
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post<AxiosResponse>(
      '/api/mate/register',
      newMateData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
