import React from 'react';
import ChatList from './list/page';

const page = () => (
  <div className=" h-[100vh] overflow-y-hidden">
    <div className="text-xl">나의 채팅 목록</div>
    <div className="h-[calc(100vh-48px)] overflow-y-auto">
      <ChatList />
    </div>
  </div>
);

export default page;
