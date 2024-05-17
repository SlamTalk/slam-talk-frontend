'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  ModalBody,
} from '@nextui-org/react';
import LocalStorage from '@/utils/localstorage';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import ChatList from './list/page';
import FullLoading from '../components/loading/FullLoading';

const ChattingListPage = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { isLoading: isUserLoading } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  useEffect(() => {
    if (isLoggedIn === 'false') {
      onOpen();
    }
  }, [isLoggedIn, onOpen]);

  if (isUserLoading) {
    return <FullLoading />;
  }

  return (
    <>
      <title>슬램톡 | 채팅</title>
      <div className="h-[calc(100vh-109px)] overflow-y-hidden">
        {isLoggedIn === 'true' ? (
          <ChatList />
        ) : (
          <>
            <div className="flex h-[80vh] items-center justify-center">
              <p>해당 서비스는 로그인 후 이용 가능합니다.</p>
            </div>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="center"
            >
              <ModalContent>
                <ModalHeader>채팅</ModalHeader>
                <ModalBody>로그인이 필요한 서비스입니다.</ModalBody>
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
              </ModalContent>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default ChattingListPage;
