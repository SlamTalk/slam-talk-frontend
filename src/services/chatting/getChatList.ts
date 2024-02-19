import axiosInstance from '@/app/api/axiosInstance';
import { IChatRoomListItem } from '@/types/chat/chatRoomListItem';
import { QueryFunction, QueryKey } from '@tanstack/react-query';

export const getChatList: QueryFunction<
  IChatRoomListItem[],
  QueryKey
> = async () => {
  try {
    const response = await axiosInstance.get('/api/chat/list');
    const myChatList: IChatRoomListItem[] = response.data.results;
    return myChatList;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch chat list');
  }
};
