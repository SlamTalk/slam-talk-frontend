'use client';

/* eslint-disable no-nested-ternary */

import React from 'react';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import FullLoading from '@/app/components/loading/FullLoading';
import { getChatList } from '../../../services/chatting/getChatList';
import { IChatRoomListItem } from '../../../types/chat/chatRoomListItem';

const ChatList = () => {
  const { data: myChatList, isLoading: isChatListLoading } = useQuery<
    IChatRoomListItem[]
  >({
    queryKey: ['myChatlist'],
    queryFn: getChatList,
  });

  if (isChatListLoading) {
    return <FullLoading />;
  }

  if (myChatList?.length === 0) {
    return (
      <div className="h-[calc(100vh-150px)]">
        <div className="text-xl">나의 채팅 목록</div>
        <div className="flex h-[80vh] items-center justify-center">
          <p>참여중인 채팅이 없습니다.</p>
        </div>
      </div>
    );
  }

  if (myChatList && myChatList.length !== 0) {
    return (
      <div className="h-[calc(100vh-150px)] overflow-y-scroll">
        <div className="text-xl">나의 채팅 목록</div>
        {myChatList.map((i: IChatRoomListItem) => (
          <div
            key={i.roomId}
            className="m-1.5 rounded-xl border border-gray-300 hover:bg-primary hover:text-white"
          >
            <div className="m-1.5 flex items-center justify-between">
              <div className="flex">
                <Avatar
                  className="m-1.5 cursor-pointer"
                  src={
                    i.roomType === 'DIRECT'
                      ? i.imgUrl || undefined
                      : i.roomType === 'BASKETBALL'
                        ? '/images/basketball-and-hoop.svg'
                        : i.roomType === 'TOGETHER'
                          ? '/images/free-icon-basketball-player-2156765.png'
                          : i.roomType === 'MATCHING'
                            ? i.imgUrl || undefined
                            : undefined
                  }
                />
                <Link href={`/chatting/chatroom/${i.roomId}`}>
                  <div className="flex">
                    {i.roomType === 'DIRECT' && (
                      <div className="mr-1 flex justify-center rounded bg-gray-200">
                        <p className="m-1 text-xs font-semibold text-gray-600">
                          1:1
                        </p>
                      </div>
                    )}
                    {i.roomType === 'BASKETBALL' && (
                      <div className="mr-1 flex justify-center rounded bg-red-200">
                        <p className="m-1 text-xs font-semibold text-primary">
                          농구장
                        </p>
                      </div>
                    )}
                    {i.roomType === 'TOGETHER' && (
                      <div className="mr-1 flex justify-center rounded bg-green-200">
                        <p className="m-1 text-xs font-semibold text-green-600">
                          메이트
                        </p>
                      </div>
                    )}
                    {i.roomType === 'MATCHING' && (
                      <div className="mr-1 flex justify-center rounded bg-blue-200">
                        <p className="m-1 text-xs font-semibold text-blue-600">
                          팀
                        </p>
                      </div>
                    )}
                    <div className="font-bold ">{i.name}</div>
                  </div>
                  <div className="text-gray-400">
                    {i.lastMessage.replace(/"/g, '')}
                  </div>
                </Link>
              </div>
              {i.newMsg ? (
                <div className="h-[10px] w-[10px] rounded-full bg-danger" />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default ChatList;
