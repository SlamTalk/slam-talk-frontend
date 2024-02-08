'use client';

import { Avatar } from '@nextui-org/react';
import { FaTimesCircle } from 'react-icons/fa';

import React from 'react';

import Link from 'next/link';

const chatList = () => {
  const testList = [
    { id: '2', title: 'test chat room1', lastMessage: '~~' },
    { id: '3', title: 'test chat room2', lastMessage: '@@' },
  ];

  return (
    <div>
      <div className="text-xl">나의 채팅 목록</div>
      {testList.map((i) => (
        <div
          key={i.id}
          className="m-1.5 rounded-xl border border-gray-300 hover:bg-primary hover:text-white"
        >
          <div className="m-1.5 flex items-center justify-between">
            <div className="flex">
              <Avatar className="m-1.5 cursor-pointer" />
              <Link href={`/chatting/chatroom/${i.id}`}>
                <div className="text-xl">{i.title}</div>
                <div className="text-gray-400">{i.lastMessage}</div>
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

export default chatList;
