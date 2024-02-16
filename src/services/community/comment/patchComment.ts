import axiosInstance from '@/app/api/axiosInstance';

export const patchComment = async (
  communityId: string,
  content: number,
  commentId: number
) => {
  try {
    const res = await axiosInstance.patch(
      `/api/community/${communityId}/edit/${commentId}`,
      { communityId, content }
    );
    const patchedComment = res.data.results;
    return patchedComment;
  } catch (err) {
    return err;
  }
};
