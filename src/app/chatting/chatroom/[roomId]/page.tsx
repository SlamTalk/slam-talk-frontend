'use client';

import { Button, Input } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';
import { IoChevronBackSharp } from 'react-icons/io5';
import * as StompJs from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import { postTokenRefresh } from '@/services/token/postTokenRefresh';
import IMessage from '@/types/chat/message';
import { IChatRoomListItem } from '@/types/chat/chatRoomListItem';
import { getChatList } from '@/services/chatting/getChatList';
import { FaTimesCircle } from 'react-icons/fa';

import axiosInstance from '../../../api/axiosInstance';
import MessageList from '../../components/messageList';

const Chatting = () => {
  const params = useParams();
  const router = useRouter();

  const [message, setMessage] = useState('');
  const [moreCount, setMoreCount] = useState(0);
  const [greeting, setGreeting] = useState('');
  const [messageListState, setMessageListState] = useState<IMessage[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data: token } = useQuery({
    queryKey: ['tokenData'],
    queryFn: postTokenRefresh,
    gcTime: 3000,
  });
  const { data: myChatList } = useQuery<IChatRoomListItem[]>({
    queryKey: ['myChatlist'],
    queryFn: getChatList,
  });
  const accessToken = token;
  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  const roomInfo = myChatList?.find((i) => i.roomId === params.roomId);
  // 농구장은 basketballId, 개인은 유저 id? 사용해서 링크 넣어주기

  const nickname = error ? null : user?.nickname;

  const client = useRef<StompJs.Client | null>(null);

  const messageListData = async () => {
    try {
      const res = await axiosInstance.post(
        `/api/chat/participation?roomId=${params.roomId}`
      );
      const listData = JSON.stringify(res.data.results);

      setMessageListState(JSON.parse(listData));
    } catch (err) {
      console.error(err);
    }
  };

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
              setMessageListState((prev: IMessage[]) => [...prev, dataMessage]);
            },
            { authorization: `Bearer ${accessToken}` }
          );
          client.current.subscribe(
            `/sub/chat/bot/${params.roomId}`,
            (res) => {
              const result = res.body;
              setGreeting(result);
            },
            { authorization: `Bearer ${accessToken}` }
          );
          client.current.publish({
            destination: `/pub/chat/bot/${params.roomId}`,
            body: JSON.stringify({
              roomId: params.roomId,
              senderNickname: user?.nickname,
              senderId: user?.id,
            }),
            headers: { authorization: `Bearer ${accessToken}` },
          });

          messageListData();
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
    if (message !== '') {
      if (client.current && client.current.connected) {
        client.current.publish({
          destination: `/pub/chat/message/${params.roomId}`,
          headers: { authorization: `Bearer ${accessToken}` },
          body: JSON.stringify({
            roomId: params.roomId,
            senderNickname: user?.nickname,
            content: message,
            senderId: user?.id,
            senderImageUrl: user?.imageUrl,
          }),
        });
        setMessage('');
      } else {
        console.log('connet error');
      }
    }
  };

  const handleToBack = () => {
    client.current?.publish({
      destination: `/pub/back/${params.roomId}`,
      headers: { authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        roomId: params.roomId,
        senderId: `${user?.id}`,
        senderNickname: nickname,
      }),
    });

    client.current?.deactivate();
  };
  const exitChat = () => {
    client.current?.publish({
      destination: `/pub/exit/${params.roomId}`,
      headers: { authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        roomId: params.roomId,
        senderNickname: nickname,
      }),
    });
    client.current?.deactivate();
  };
  const postMore = async () => {
    try {
      setMoreCount(moreCount + 1);
      const res = await axiosInstance.post(
        `/api/chat/history?roomId=${params.roomId}&count=${moreCount}`
      );
      console.log(res.data.results);
      setMessageListState([...res.data.results.reverse()]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
    const fetchData = async () => {
      connect();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div aria-label="chat room wrapper" className="min-h-[667px]">
      <div>
        <div className="fixed top-0 flex h-[61px] w-full max-w-[600px] items-center rounded-md bg-primary">
          <IoChevronBackSharp
            className="left-[20px] top-[20px] w-[50px] text-xl text-white"
            cursor="pointer"
            size={24}
            onClick={() => {
              handleToBack();
              router.back();
            }}
          />
          <h2 className="w-[525px] text-center text-xl text-white">
            {roomInfo?.roomType === 'DIRECT' && roomInfo?.name}
            {roomInfo?.roomType === 'BASEKETBALL' && roomInfo?.name}
            {roomInfo?.roomType === 'TOGETHER' && roomInfo?.name}
            {roomInfo?.roomType === 'MATCHING' && roomInfo?.name}
          </h2>
          <div className="cursor-pointer">
            <Button
              isIconOnly
              className="h-auto w-14 border-none bg-transparent"
              onClick={() => {
                exitChat();
                router.back();
              }}
            >
              <FaTimesCircle className="m-1.5 text-xl" />
            </Button>
          </div>
        </div>
      </div>
      <div className=" fixed	flex h-[80px] w-full max-w-[600px] flex-col items-center justify-center space-y-5">
        <Button onClick={postMore}>more</Button>
        {greeting ? (
          <div
            aria-label="첫 방문 메시지 wrapper"
            className="flex	 w-full justify-center"
          >
            <p
              aria-label="첫 방문 메시지"
              className="z-50 w-[150px] rounded bg-gray-300 text-center text-white"
            >
              {greeting}
            </p>
          </div>
        ) : null}
      </div>

      <MessageList list={messageListState} />

      <div
        aria-label="chat input section"
        className="b-0 fixed flex w-full min-w-full rounded-lg border border-gray-300 md:w-[600px] md:min-w-[375px]"
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
