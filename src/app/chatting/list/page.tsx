'use client';

import { Avatar } from '@nextui-org/react';
import { FaTimesCircle } from 'react-icons/fa';

import React from 'react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getChatList } from '@/services/chatting/getChatList';
import { IChatRoomListItem } from '@/types/chat/\bchatRoomListItem';
import axiosInstance from '@/app/api/axiosInstance';
import { getUserData } from '@/services/user/getUserData';

const ChatList = () => {
  const { data: loginData } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });
  const createData = {
    creator_id: loginData?.id,
    participants: [12],
    roomType: 'DM',
    basket_ball_id: 0,
    name: '',
  };
  const postChatRoom = async () => {
    const res = await axiosInstance.post(
      `/api/chat/create`,
      JSON.stringify(createData)
    );
    return res.data.results;
  };
  const { data: myChatList, isLoading } = useQuery<IChatRoomListItem[]>({
    queryKey: ['myChatlist'],
    queryFn: async () => {
      const data = await getChatList();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!myChatList) {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            // postChatRoom();
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

      {myChatList?.map((i) => (
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
                  {i.roomType === 'TOGHTHER' && i.name}
                  {i.roomType === 'MATCHING' && i.name}
                  {!i.roomType && 'testroom'}
                </div>
                <div className="text-gray-400">
                  {i.lastMessage.replace(/"/g, '')}
                </div>
              </Link>
            </div>
            <div className="cursor-pointer">
              <FaTimesCircle className="m-1.5 text-xl" />
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
