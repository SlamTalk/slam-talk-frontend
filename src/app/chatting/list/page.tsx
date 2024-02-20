'use client';

import { Avatar } from '@nextui-org/react';

import React from 'react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
// import { getChatList } from '@/services/chatting/getChatList';

import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';

import { IChatRoomListItem } from '../../../types/chat/chatRoomListItem';
import axiosInstance from '../../api/axiosInstance';
import { getUserData } from '../../../services/user/getUserData';
import { getChatList } from '../../../services/chatting/getChatList';

const ChatList = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const router = useRouter();
  const { data: loginData } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });
  const createData = {
    participants: [6, loginData?.id],
    roomType: 'DM',
  };
  const postChatRoom = async () => {
    const res = await axiosInstance.post(
      `/api/chat/create`,
      JSON.stringify(createData)
    );
    return res.data.results;
  };
  const { data: myChatList } = useQuery<IChatRoomListItem[]>({
    queryKey: ['myChatlist'],
    queryFn: getChatList,
  });

  if (isLoggedIn === 'false') {
    return router.push('/login');
  }
  if (!myChatList) {
    return (
      <div>
        참여중인 채팅방이 없습니다
        <button
          type="button"
          onClick={() => {
            postChatRoom();
          }}
        >
          testroom
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-xl">나의 채팅 목록</div>
      <title>슬램톡 | 채팅</title>
      {myChatList?.map((i: IChatRoomListItem) => (
        <div
          key={i.roomId}
          className="m-1.5 rounded-xl border border-gray-300 hover:bg-primary hover:text-white"
        >
          <div className="m-1.5 flex items-center justify-between">
            <div className="flex">
              <Avatar
                className="m-1.5 cursor-pointer"
                src={i.imgUrl ? i.imgUrl : undefined}
              />
              <Link href={`/chatting/chatroom/${i.roomId}`}>
                <div className="text-xl">
                  {i.roomType === 'DIRECT' && i.name}
                  {i.roomType === 'BASEKETBALL' && i.name}
                  {i.roomType === 'TOGETHER' && i.name}
                  {i.roomType === 'MATCHING' && i.name}
                </div>
                <div className="text-gray-400">
                  {i.lastMessage.replace(/"/g, '')}
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div>
        <button
          type="button"
          onClick={() => {
            postChatRoom();
          }}
        >
          testroom
        </button>
      </div>
    </div>
  );
};
export default ChatList;
