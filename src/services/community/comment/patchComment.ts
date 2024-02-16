import axiosInstance from '@/app/api/axiosInstance';

export const patchComment = async (
  communityId: number,
  editedComment: string,
  commentId: number
) => {
  try {
    const res = await axiosInstance.patch(
      `/api/community/${communityId}/edit/${commentId}`,
      { communityId, content: editedComment }
    );
    const patchedComment = res.data.results;
    return patchedComment;
  } catch (err) {
    return err;
  }
};
