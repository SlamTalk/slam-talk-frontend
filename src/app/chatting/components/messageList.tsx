import { Avatar } from '@nextui-org/react';
import React from 'react';

const MessageList = () => {
  const messages = [
    { id: 1, userId: '231', nickname: 'user-1', message: '안녕하세요' },
    { id: 2, userId: '123', nickname: 'user-2', message: 'hello' },
    { id: 3, userId: '231', nickname: 'user-1', message: '잘가요~' },
  ];
  return (
    <div className="min-w mt-5 h-[700px] w-full">
      {messages.map((i) =>
        i.userId === '123' ? (
          <div key={i.id} className="flex h-20 w-full justify-start">
            <div aria-label="userIcon">
              <Avatar className="mx-2" />
            </div>
            <div aria-label="상대의 닉네임 && 채팅 메시지">
              <p className="text-start">{i.nickname}</p>
              <div className="my-1 max-w-sm rounded-lg bg-slate-200 p-4 text-black">
                {i.message}
              </div>
            </div>
          </div>
        ) : (
          <div key={i.id} className="flex h-20 w-full justify-end">
            <div aria-label="나의 닉네임 & 채팅 메시지">
              <p className="text-end">{i.nickname}</p>
              <div className="my-3 max-w-sm rounded-lg bg-primary p-4 text-white">
                {i.message}
              </div>
            </div>
            <div aria-label="userIcon">
              <Avatar className="mx-2" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MessageList;
