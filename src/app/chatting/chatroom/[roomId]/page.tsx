'use client';

import { Button, Input } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';

import React from 'react';
import * as StompJs from '@stomp/stompjs';
import MessageList from '../../chatComponents/messageList';

const chatTest = () => {
  console.log('chat test start');
  const client = new StompJs.Client({
    brokerURL: `ws://localhost:8080/ws/slamtalk`,
    connectHeaders: {
      id: 'sub-0',
      authorization:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcwNjg5MjgzN30.jAF5XPCuOvYOg0ZoKFhSG5zUi9o398mz9En9wqNNWpg2ubA3wFvYSSStWWKowO2cuOV2I0rbDzM4SZB86YP9nw',
    },
    debug: (msg) => {
      console.log({ msg });
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  const subscribe = () => {
    client.subscribe('/sub/chat/enter/52', (frame) => {
      const data = JSON.parse(frame.body);
      console.log({ data });
    });
  };

  const publish = () => {
    client.publish({
      destination: '/pub/chat/message/52',
      body: JSON.stringify({ userId: 'sub-0' }),
    });
  };
  client.onStompError = () => {
    console.log('erororororooror');
  };
  client.onConnect = () => {
    console.log('성공~!!');
    subscribe();
    publish();
  };

  client.activate();
};

const chatting = () => (
  <div aria-label="chatt room wrapper" className="h-[765px]">
    <MessageList />
    <div
      aria-label="chat input section"
      className="flex w-full rounded-lg border border-slate-300"
    >
      <Input className="text-xl" />
      <Button
        isIconOnly
        className="h-auto w-14 border-none bg-transparent"
        onClick={chatTest}
      >
        <IoIosSend className="text-4xl text-primary" />
      </Button>
    </div>
  </div>
);

export default chatting;
