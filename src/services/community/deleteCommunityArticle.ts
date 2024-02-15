import axiosInstance from '@/app/api/axiosInstance';

export const deleteCommunityArticle = async (communityId: string) => {
  const res = await axiosInstance.delete(
    `/api/community/delete/${communityId}`
  );
  const deleted = res.data;
  return deleted;
};
