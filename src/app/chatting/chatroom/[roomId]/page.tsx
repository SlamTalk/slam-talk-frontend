import { Button, Input } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';

import React from 'react';
import MessageList from '../../components/messageList';

const chatting = () => (
  <div aria-label="chat room wrapper" className="min-h-[667px]">
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

export default chatting;
