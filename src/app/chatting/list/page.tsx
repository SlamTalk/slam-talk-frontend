'use client';

/* eslint-disable no-nested-ternary */

import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import LocalStorage from '@/utils/localstorage';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IChatRoomListItem } from '../../../types/chat/chatRoomListItem';

import { getChatList } from '../../../services/chatting/getChatList';

const ChatList = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isLoggedIn === 'false') {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: myChatList } = useQuery<IChatRoomListItem[]>({
    queryKey: ['myChatlist'],
    queryFn: getChatList,
  });

  if (myChatList?.length === 0) {
    return <div>참여중인 채팅방이 없습니다</div>;
  }

  return myChatList ? (
    <div className="h-[calc(100vh-150px)] overflow-y-scroll">
      <title>슬램톡 | 채팅</title>
      {myChatList?.map((i: IChatRoomListItem) => (
        <div
          key={i.roomId}
          className="m-1.5 rounded-xl border border-gray-300 hover:bg-primary hover:text-white"
        >
          <div className="m-1.5 flex items-center justify-between">
            <div className="flex">
              <Avatar
                className="m-1.5 cursor-pointer"
                src={
                  i.roomType === 'DIRECT'
                    ? i.imgUrl || undefined
                    : i.roomType === 'BASKETBALL'
                      ? '/images/basketball-and-hoop.svg'
                      : i.roomType === 'TOGETHER'
                        ? '/images/free-icon-basketball-player-2156765.png'
                        : i.roomType === 'MATCHING'
                          ? i.imgUrl || undefined
                          : undefined
                }
              />

              <Link href={`/chatting/chatroom/${i.roomId}`}>
                <div className="text-xl">
                  {i.roomType === 'DIRECT' && i.name}
                  {i.roomType === 'BASKETBALL' && i.name}
                  {i.roomType === 'TOGETHER' && i.name}
                  {i.roomType === 'MATCHING' && i.name}
                </div>

                <div className="text-gray-400">
                  {i.lastMessage.replace(/"/g, '')}
                </div>
              </Link>
            </div>
            <div className="w-[60px]">
              {i.roomType === 'DIRECT' && (
                <div className="flex w-[50px] justify-center rounded bg-gray-200">
                  <p className="my-1 font-semibold text-gray-600">일반</p>
                </div>
              )}
              {i.roomType === 'BASKETBALL' && (
                <div className="flex w-[50px] justify-center rounded bg-red-200">
                  <p className="my-1 font-semibold text-primary">농구장</p>
                </div>
              )}
              {i.roomType === 'TOGETHER' && (
                <div className="flex w-[50px] justify-center rounded bg-blue-200">
                  <p className="my-1 font-semibold text-blue-600">메이트</p>
                </div>
              )}
              {i.roomType === 'MATCHING' && (
                <div className="flex w-[50px] justify-center rounded bg-green-200">
                  <p className="my-1 font-semibold text-green-600">매칭</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>로그인이 필요한 서비스입니다.</ModalHeader>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    router.push('/login');
                  }}
                >
                  로그인하러 가기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex h-[80vh] items-center justify-center">
        <p>참여중인 채팅이 없습니다.</p>
      </div>
    </div>
  );
};
export default ChatList;
