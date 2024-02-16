import axiosInstance from '@/app/api/axiosInstance';

export const getComment = async (communityId: number) => {
  try {
    const res = await axiosInstance.get(
      `/api/community/${communityId}/comment`
    );
    const commentList = res.data.results;
    return commentList;
  } catch (err) {
    return err;
  }
};
