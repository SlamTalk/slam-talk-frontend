import React from 'react';
import ChatList from './list/page';

const page = () => (
  <div className="h-[calc(100vh-109px)] overflow-y-hidden">
    <div className="text-xl">나의 채팅 목록</div>
    <ChatList />
  </div>
);

export default page;
