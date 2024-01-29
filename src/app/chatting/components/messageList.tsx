import { Avatar } from '@nextui-org/react';
import React from 'react';

const MessageList = () => {
  const messages = [
    { id: 1, userId: '231', nickname: 'user-1', message: '안녕하세요' },
    { id: 2, userId: '123', nickname: 'user-2', message: 'hello' },
    { id: 3, userId: '231', nickname: 'user-1', message: '잘가요~' },
  ];
  return (
    <div className="h-[705px] w-full">
      {messages.map((i) =>
        i.userId === '123' ? (
          <div key={i.id} className="flex h-20 w-full justify-start">
            <div aria-label="userIcon">
              <p>{i.nickname}</p>
              <Avatar className="me-2 ms-2" />
            </div>
            <div className="my-4 max-w-sm rounded-lg bg-primary p-4 text-white">
              {i.message}
            </div>
          </div>
        ) : (
          <div key={i.id} className="flex h-20 w-full justify-end">
            <div className="right-10 my-4 max-w-sm rounded-lg bg-primary p-4 text-white">
              {i.message}
            </div>
            <div aria-label="userIcon">
              <p>{i.nickname}</p>
              <Avatar className="me-2 ms-2" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MessageList;
