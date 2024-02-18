import axiosInstance from '@/app/api/axiosInstance';
import { IChatRoomListItem } from '@/types/chat/chatRoomListItem';

export const getChatList = async () => {
  try {
    const response = await axiosInstance.get('/api/chat/list');
    const responseList: IChatRoomListItem[] = response.data.results;
    const myChatList: IChatRoomListItem[] = [];
    responseList.map((item) => myChatList.push(item));
    return myChatList;
  } catch (err) {
    console.error(err);
    return err;
  }
};
