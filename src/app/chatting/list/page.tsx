'use client';

import { Avatar } from '@nextui-org/react';
import { FaTimesCircle } from 'react-icons/fa';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
// import { getChatList } from '@/services/chatting/getChatList';
import { IChatRoomListItem } from '@/types/chat/chatRoomListItem';
import axiosInstance from '@/app/api/axiosInstance';
import { getUserData } from '@/services/user/getUserData';

const ChatList = () => {
  const { data: loginData } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });
  const createData = {
    participants: [12, loginData?.id],
    roomType: 'DM',
  };
  const postChatRoom = async () => {
    const res = await axiosInstance.post(
      `/api/chat/create`,
      JSON.stringify(createData)
    );
    return res.data.results;
  };
  // const { data: myChatList } = useQuery<IChatRoomListItem[]>({
  //   queryKey: ['myChatlist'],
  //   queryFn: () => {
  //     getChatList();
  //   },
  // });

  const [myChatList, setMyChatList] = useState<IChatRoomListItem[]>([]);
  const handleChatList = async () => {
    try {
      const res = await axiosInstance.get('/api/chat/list');
      res.data.results.map((i: IChatRoomListItem) =>
        setMyChatList([...myChatList, i])
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
