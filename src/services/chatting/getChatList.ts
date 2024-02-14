import axiosInstance from '@/app/api/axiosInstance';

export const getChatList = async () => {
  try {
    const response = await axiosInstance.get('/api/chat/list');
    const myChatList = response.data.results;
    return myChatList;
  } catch (err) {
    console.error(err);
    return err;
  }
};
