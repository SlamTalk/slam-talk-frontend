import axiosInstance from '@/app/api/axiosInstance';

export const postComment = async (commentPostData: {
  communityId: number;
  content: string;
}) => {
  try {
    await axiosInstance.post(
      `/api/community/${commentPostData.communityId}/new-comment`,
      commentPostData
    );
  } catch (err) {
    console.error(err);
  }
};
