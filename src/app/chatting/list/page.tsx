'use client';

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
// import { getChatList } from '@/services/chatting/getChatList';

import LocalStorage from '@/utils/localstorage';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IChatRoomListItem } from '../../../types/chat/chatRoomListItem';
// import axiosInstance from '../../api/axiosInstance';
// import { getUserData } from '../../../services/user/getUserData';
import { getChatList } from '../../../services/chatting/getChatList';

const ChatList = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { data: loginData } = useQuery({
  //   queryKey: ['loginData'],
  //   queryFn: getUserData,
  // });
  // const createData = {
  //   participants: [1, loginData?.id, 4, 10],
  //   roomType: 'TM',
  //   together_id: '47000',
  //   name: '함께 즐겨요~',
  // };
  // const postChatRoom = async () => {
  //   const res = await axiosInstance.post(
  //     `/api/chat/create`,
  //     JSON.stringify(createData)
  //   );
  //   return res.data.results;
  // };
  const { data: myChatList } = useQuery<IChatRoomListItem[]>({
    queryKey: ['myChatlist'],
    queryFn: getChatList,
  });

  // if (!myChatList) {
  //   return (
  //     <div>
  //       참여중인 채팅방이 없습니다
  //       <button
  //         type="button"
  //         onClick={() => {
  //           postChatRoom();
  //         }}
  //       >
  //         testroom
  //       </button>
  //     </div>
  //   );
  // }
  useEffect(() => {
    if (isLoggedIn === 'false') {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return myChatList ? (
    <div>
      <div className="text-xl">나의 채팅 목록</div>
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
                src={i.imgUrl ? i.imgUrl : undefined}
              />
              <Link href={`/chatting/chatroom/${i.roomId}`}>
                <div className="text-xl">
                  {i.roomType === 'DIRECT' && i.name}
                  {i.roomType === 'BASEKETBALL' && i.name}
                  {i.roomType === 'TOGETHER' && i.name}
                  {i.roomType === 'MATCHING' && i.name}
                </div>
                <div className="text-gray-400">
                  {i.lastMessage.replace(/"/g, '')}
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div>
        {/* <button
          type="button"
          onClick={() => {
            postChatRoom();
          }}
        >
          testroom
        </button> */}
      </div>
    </div>
  ) : (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
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
