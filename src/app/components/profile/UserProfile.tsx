/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { getOtherUserData } from '@/services/user/getOtherUserData';
import { getUserData } from '@/services/user/getUserData';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../api/axiosInstance';

export interface UserProfileProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const { error, data: otherUser } = useQuery({
    queryKey: ['otherUserData', userId],
    queryFn: () => getOtherUserData({ userId }),
  });

  const { data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  if (error) {
    console.log(error);
  }

  const handleCreateChatting = async () => {
    if (user && userId) {
      const myId = user.id;
      try {
        const response = await axiosInstance.post('/api/chat/create', {
          participants: [myId, userId],
          roomType: 'DM',
        });
        if (response.status === 200) {
          const room = response.data.results;
          router.push(`/chatting/chatroom/${room}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGoMyPage = () => {
    router.push('/my-page/profile');
  };

  if (otherUser) {
    return (
      <>
        <title>슬램톡 | 유저 프로필</title>
        <Modal size="sm" isOpen={isOpen} onClose={onClose} placement="top">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {otherUser.nickname}님의 프로필
                </ModalHeader>
                <ModalBody>
                  <div className="flex max-w-md flex-col gap-3 p-4">
                    <div className="flex flex-col items-center gap-3">
                      <Avatar
                        showFallback
                        size="lg"
                        alt="profile-img"
                        src={otherUser.imageUrl}
                      />
                      <p className="text-xl font-semibold">
                        {otherUser.nickname}
                      </p>
                      <Card className="w-full rounded-md">
                        <CardBody className="w-full text-sm">
                          {otherUser.selfIntroduction
                            ? otherUser.selfIntroduction
                            : '소개'}
                        </CardBody>
                      </Card>
                    </div>
                    <div className="mt-4 flex w-full justify-center gap-10">
                      <div className="flex w-1/3 flex-col gap-3 font-semibold opacity-100">
                        <p className="text-sm font-semibold">포지션</p>
                        <Card className="rounded-md text-sm">
                          <CardBody>
                            {otherUser.basketballPosition
                              ? otherUser.basketballPosition
                              : '미정'}
                          </CardBody>
                        </Card>
                        <p className="text-sm font-semibold">농구 실력</p>
                        <Card className="rounded-md text-sm">
                          <CardBody>
                            {otherUser.basketballSkillLevel
                              ? otherUser.basketballSkillLevel
                              : '🤔'}
                          </CardBody>
                        </Card>
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold">활동 내역</p>
                        <Card className="rounded-md">
                          <CardBody>
                            <div className="flex flex-col gap-6 text-sm">
                              <p className="underline underline-offset-2">
                                Lv.{otherUser.level}
                              </p>
                              <p>
                                팀 매칭 횟수:{' '}
                                {
                                  otherUser.teamMatchingCompleteParticipationCount
                                }
                              </p>
                              <p>
                                농구 메이트 참여:{' '}
                                {otherUser.mateCompleteParticipationCount}
                              </p>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    닫기
                  </Button>
                  {user && user.id === otherUser.id ? (
                    <Button color="primary" onClick={handleGoMyPage}>
                      프로필 수정하기
                    </Button>
                  ) : (
                    <Button color="primary" onClick={handleCreateChatting}>
                      1 : 1 채팅 걸기
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  return null;
};

export default UserProfile;
