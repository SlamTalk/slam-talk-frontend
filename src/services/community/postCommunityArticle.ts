import axiosInstance from '@/app/api/axiosInstance';

interface IArticle {
  title: string;
  writerId: string;
  writerNickname: string;
  content: string;
  tag: string;
  comments: { id: string; writerId: string; content: string }[];
}
export const postCommunity = async (article: IArticle) => {
  try {
    await axiosInstance.post('/api/community/new-form', { article });
  } catch (error) {
    console.error(error);
  }
};
