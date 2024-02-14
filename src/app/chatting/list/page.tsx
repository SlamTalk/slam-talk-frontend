'use client';

import { Avatar } from '@nextui-org/react';
import { FaTimesCircle } from 'react-icons/fa';

import React from 'react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getChatList } from '@/services/chatting/getChatList';
import { IChatRoomListItem } from '@/types/chat/\bchatRoomListItem';

const ChatList = () => {
  const { data: myChatList } = useQuery<IChatRoomListItem[]>({
    queryKey: ['myChatlist'],
    queryFn: getChatList,
  });

  return (
    <div>
      <div className="text-xl">나의 채팅 목록</div>

      {myChatList ? (
        myChatList?.map((i) => (
          <div
            key={i.roomId}
            className="m-1.5 rounded-xl border border-gray-300 hover:bg-primary hover:text-white"
          >
            <div className="m-1.5 flex items-center justify-between">
              <div className="flex">
                <Avatar className="m-1.5 cursor-pointer" />
                <Link href={`/chatting/chatroom/${i.roomId}`}>
                  <div className="text-xl">
                    {i.roomType === 'DIRECT' && i.partnerId}
                    {i.roomType === 'BASEKETBALL' && i.courtId}
                    {i.roomType === 'TOGETHER' && i.courtId}
                    {i.roomType === 'MATCHING' && i.courtId}
                  </div>
                  <div className="text-gray-400">{i.lastMessage}</div>
                </Link>
              </div>
              <div className="cursor-pointer">
                <FaTimesCircle className="m-1.5 text-xl" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>참여중인 채팅방이 없습니다</div>
      )}
    </div>
  );
};

export default ChatList;
