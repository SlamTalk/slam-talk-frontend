import axiosInstance from '@/app/api/axiosInstance';

export const patchCommunityArticle = async (
  communityId: number,
  post: FormData
) => {
  try {
    const res = await axiosInstance.patch(
      `/api/community/edit/${communityId}`,
      post,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const patchedArticle = res.data.results;
    return patchedArticle;
  } catch (err) {
    return err;
  }
};
