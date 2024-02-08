'use client';

import { Button, Input } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';
import { IoChevronBackSharp } from 'react-icons/io5';
import * as StompJs from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
// import axiosInstance from '../../../api/axiosInstance';
import { postTokenRefresh } from '@/services/token/postTokenRefresh';
import MessageList from '../../components/messageList';

const Chatting = () => {
  const params = useParams();
  const router = useRouter();

  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data } = useQuery({
    queryKey: ['tokenData'],
    queryFn: postTokenRefresh,
  });
  const accessToken = data;
  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  const nickname = error ? null : user?.nickname;

  const client = useRef<StompJs.Client | null>(null);
  const connect = async () => {
    client.current = new StompJs.Client({
      brokerURL: process.env.NEXT_PUBLIC_SOCKET_URL,
      connectHeaders: {
        id: 'sub-0',
        authorization: `Bearer ${accessToken}`,
      },
      onConnect: (msg) => {
        console.log({ msg });
        if (client.current !== null) {
          client.current.subscribe(
            `/sub/chat/room/${params.roomId}`,
            (frame) => {
              const dataMessage = JSON.parse(frame.body);
              console.log({ dataMessage });
            },
            { authorization: `Bearer ${accessToken}` }
          );
          client.current.publish({
            destination: `/pub/enter/${params.roomId}`,
            headers: { authorization: `Bearer ${accessToken}` },
          });
        }
      },
      onStompError: (err) => {
        console.log({ err });
        if (client.current) {
          client.current.deactivate();
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 1000,
      heartbeatOutgoing: 1000,
    });
    if (client.current !== null) {
      await client.current.activate();
    }
  };

  const sendMessage = () => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/pub/chat/message/${params.roomId}`,
        headers: { authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          roomId: params.roomId,
          senderNickname: nickname,
          content: message,
        }),
      });
      setMessage('');
    } else {
      console.log('connet error');
    }
  };

  const handleToBack = () => {
    client.current?.publish({
      destination: `/pub/back/${params.roomId}}`,
      headers: { authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        roomId: params.roomId,
        senderNickname: nickname,
      }),
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
    const fetchData = async () => {
      // axiosInstance.post(
      //   `/api/chat/create`,
      //   JSON.stringify({
      //     roomType: '',
      //     name: '',
      //   })
      // );
      connect();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const fetchToken = async () => {
  //   const response = await axiosInstance.patch('/api/tokens/refresh');
  //   if (response.status === 200) {
  //     const newAccessToken = response.headers.authorization;
  //     console.log(newAccessToken);
  //   }
  // };
  // useEffect(() => {
  //   fetchToken();
  // }, []);

  return (
    <div aria-label="chat room wrapper" className="min-h-[667px]">
      <div className="fixed top-0 z-50 flex h-[61px] w-full max-w-[600px] items-center rounded-md bg-primary">
        <IoChevronBackSharp
          className="w-[50px] text-xl text-white"
          cursor="pointer"
          size={24}
          onClick={() => {
            handleToBack();
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
        className="fixed flex w-full min-w-full rounded-lg border border-gray-300 md:w-[600px] md:min-w-[375px]"
      >
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button
          isIconOnly
          className="h-auto w-14 border-none bg-transparent"
          onClick={sendMessage}
        >
          <IoIosSend className="text-4xl text-primary" />
        </Button>
      </div>
    </div>
  );
};

export default Chatting;
