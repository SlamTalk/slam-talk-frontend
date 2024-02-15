import axiosInstance from '@/app/api/axiosInstance';

export interface ICommentPostData {
  communityId: number;
  content: string;
}
export const postComment = async (commentPostData: ICommentPostData) => {
  try {
    await axiosInstance.post(
      `/api/community/${commentPostData.communityId}/new-comment`,
      commentPostData.content
    );
  } catch (err) {
    console.error(err);
  }
};
