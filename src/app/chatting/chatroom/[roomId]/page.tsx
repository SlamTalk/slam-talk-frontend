'use client';

import { Button, Input } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';
import { IoChevronBackSharp } from 'react-icons/io5';

import * as StompJs from '@stomp/stompjs';
import React, { useLayoutEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import MessageList from '../../components/messageList';


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


const Chatting = () => {
  const params = useParams();
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const detectMoblieKeyboard = () => {
      if (document.activeElement?.tagName === 'INPUT') {
        ref.current?.scrollIntoView({ block: 'end' });
      }
    };
    window.addEventListener('resize', () => {
      if (window.innerHeight < window.screen.height) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
    window.addEventListener('resize', detectMoblieKeyboard);
    return window.removeEventListener('resize', detectMoblieKeyboard);
  });
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
        className="flex w-[600px] min-w-[375px] rounded-lg border border-slate-300"
      >
        <Input className="" innerWrapperRef={ref} />
        <Button isIconOnly className="h-auto w-14 border-none bg-transparent" onClick={chatTest}>
          <IoIosSend className="text-4xl text-primary" />
        </Button>
      </div>
    </div>
  );
};

export default Chatting;
