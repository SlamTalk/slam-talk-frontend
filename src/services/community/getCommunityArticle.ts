import axiosInstance from '@/app/api/axiosInstance';

export const getCommunityArticle = async (roomId: string) => {
  try {
    const res = await axiosInstance(`/api/community/board/${roomId}`);
    const articleData = res.data.results;
    return articleData;
  } catch (err) {
    return err;
  }
};
