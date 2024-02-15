import axiosInstance from '@/app/api/axiosInstance';

export const getCommunityBoard = async () => {
  const res = await axiosInstance('/api/community/board');
  const communityBoard = res.data.results;
  return communityBoard;
};
