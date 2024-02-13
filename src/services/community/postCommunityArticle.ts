import axiosInstance from '@/app/api/axiosInstance';
import { IArticle } from '@/types/community/article';

export const postCommunity = async (article: IArticle | FormData) => {
  try {
    await axiosInstance.post('/api/community/new-form', { article });
  } catch (error) {
    console.error(error);
  }
};
