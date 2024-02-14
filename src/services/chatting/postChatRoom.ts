import axiosInstance from '@/app/api/axiosInstance';
import { ICreateChatRoom } from '@/types/chat/createChatRoom';

export const postChatRoom = async (createData: ICreateChatRoom) => {
  const res = await axiosInstance.post(
    `/api/chat/create`,
    JSON.stringify(createData)
  );
  return res.data.results;
};
