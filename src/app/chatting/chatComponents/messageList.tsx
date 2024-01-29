import { Avatar } from '@nextui-org/react';
import React from 'react';

const MessageList = () => {
  const messages = [
    { id: 1, userId: '231', nickname: 'user-1', message: '안녕하세요' },
    { id: 2, userId: '123', nickname: 'user-2', message: 'hello' },
    { id: 3, userId: '231', nickname: 'user-1', message: '잘가요~' },
  ];
  return (
    <div className="h-[705px]">
      {messages.map((i) => (
        <div key={i.id} className="flex h-20 w-[150px]">
          <div aria-label="userIcon">
            <p>{i.nickname}</p>
            <Avatar className="me-2 border-3 border-primary" />
          </div>
          <div className="z-1 mx-auto my-4 max-w-sm rounded-lg bg-primary p-4 text-white">
            {i.message}
            <div className="relative bottom-2 right-3 z-0 h-5 w-4 -rotate-[22deg] border-t-0 border-solid border-blue-500 bg-primary" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
