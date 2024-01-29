import { Button, Input } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';

import React from 'react';
import MessageList from '../../components/messageList';

const chatting = () => (
  <div aria-label="chatt room wrapper" className="h-[765px]">
    <MessageList />
    <div
      aria-label="chat input section"
      className="flex w-full rounded-lg border border-slate-300"
    >
      <Input className="text-xl" />
      <Button isIconOnly className="h-auto w-14 border-none bg-transparent">
        <IoIosSend className="text-4xl text-primary" />
      </Button>
    </div>
  </div>
);

export default chatting;
