import axiosInstance from '@/app/api/axiosInstance';

export const deleteComment = async (communityId: number, commentId: number) => {
  try {
    await axiosInstance.delete(
      `/api/community/${communityId}/delete/${commentId}`
    );
  } catch (err) {
    console.error(err);
  }
};
