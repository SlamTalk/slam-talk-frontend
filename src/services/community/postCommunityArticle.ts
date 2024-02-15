import axiosInstance from '@/app/api/axiosInstance';

export const postCommunity = async (article: FormData) => {
  try {
    await axiosInstance.post('/api/community/new-form', article, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error(error);
  }
};
