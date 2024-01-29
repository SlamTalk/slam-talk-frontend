'use client';

import { Button, Input } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';
import { IoChevronBackSharp } from 'react-icons/io5';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

import MessageList from '../../components/messageList';

const Chatting = () => {
  const params = useParams();
  const router = useRouter();
  return (
    <div aria-label="chat room wrapper" className="min-h-[667px]">
      <div className="fixed top-0 z-50 flex h-[61px] w-full max-w-[600px] items-center rounded-md bg-primary">
        <IoChevronBackSharp
          className="w-[50px] justify-self-start text-xl text-white"
          cursor="pointer"
          size={24}
          onClick={() => {
            router.back();
          }}
        />

        <h2 className="w-[525px] text-center text-xl text-white">
          chat room {params.roomId}
        </h2>
      </div>
      <MessageList />
      <div
        aria-label="chat input section"
        className="flex min-w-[375px] rounded-lg border border-slate-300"
      >
        <Input className="" />
        <Button isIconOnly className="h-auto w-14 border-none bg-transparent">
          <IoIosSend className="text-4xl text-primary" />
        </Button>
      </div>
    </div>
  );
};

export default Chatting;
