import axiosInstance from '@/app/api/axiosInstance';
import { IBoard } from '@/types/community/board';

export const getCommunityBoard = async (): Promise<IBoard[]> => {
  const res = await axiosInstance.get('/api/community/board');
  const communityBoard = res.data.results.reverse();

  return communityBoard;
};
