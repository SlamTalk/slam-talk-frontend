import axiosInstance from '@/app/api/axiosInstance';
import { MatePost } from '@/types/matching/mateDataType';

export const fetchMateData = async (): Promise<MatePost[]> => {
  const response = await axiosInstance
    .get('/api/mate/list')
    .then((res) => res.data.results.matePostList);

  return response;
};
