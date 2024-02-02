'use client';

import { Button, Input } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';
import { IoChevronBackSharp } from 'react-icons/io5';

import * as StompJs from '@stomp/stompjs';
import React, { useLayoutEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import useAuthStore from '@/store/authStore';
import MessageList from '../../components/messageList';

const { accessToken } = useAuthStore.getState();

const chatTest = () => {
  console.log('chat test start');
  const client = new StompJs.Client({
    brokerURL: process.env.NEXT_PUBLIC_SOCKET_URL,
    connectHeaders: {
      id: 'sub-0',
      authorization: `Bearer ${accessToken}`,
    },
    onConnect: async (msg) => {
      console.log('여기');
      console.log({ msg });

      await client.subscribe(
        '/sub/chat/enter/1',
        (frame) => {
          const data = JSON.parse(frame.body);
          console.log({ data });
        },
        { authorization: `Bearer ${accessToken}` }
      );
      client.publish({
        destination: '/pub/enter/1',
        headers: { authorization: `Bearer ${accessToken}` },
      });
      client.publish({
        destination: '/pub/chat/message/1',
        headers: { authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          roomId: 1,
          senderId: 'user',
          content: 'HelloSTOMPWorld^_^',
        }),
      });
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 1000,
    heartbeatOutgoing: 1000,
  });

  client.onStompError = (error) => {
    console.log({ error });
    client.deactivate();
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
          className="w-[50px] text-xl text-white"
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
        className="fixed flex w-[600px] min-w-[375px] rounded-lg border border-slate-300"
      >
        <Input innerWrapperRef={ref} />
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
};

export default Chatting;
