'use client';

import { Avatar } from '@nextui-org/react';
import { FaTimesCircle } from 'react-icons/fa';

import React from 'react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getChatList } from '@/services/chatting/getChatList';
import { IChatRoomListItem } from '@/types/chat/\bchatRoomListItem';

const ChatList = () => {
  const { data: myChatList, isLoading } = useQuery<IChatRoomListItem[]>({
    queryKey: ['myChatlist'],
    queryFn: getChatList,
    gcTime: 5000,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!myChatList) {
    return (
      <div>
        nothing
        <Link href="/chatting/chatroom/12">testroom</Link>
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
                  {i.roomType === 'DIRECT' && i.partnerId}
                  {i.roomType === 'BASEKETBALL' && i.courtId}
                  {i.roomType === 'TOGETHER' && i.courtId}
                  {i.roomType === 'MATCHING' && i.courtId}
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
    </div>
  );
};

export default ChatList;
