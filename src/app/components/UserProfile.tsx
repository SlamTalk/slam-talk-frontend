'use client';

import {
  basketballUserPositionData,
  basketballUserSkillData,
} from '@/constants/basketballUserData';
import { getOtherUserData } from '@/services/user/getOtherUserData';
import LocalStorage from '@/utils/localstorage';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { IoIosClose } from 'react-icons/io';

export interface UserProfileProps {
  userId: number;
  isVisible: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  isVisible,
  onClose,
}) => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');

  const { error, data: user } = useQuery({
    queryKey: ['otherUserData', userId],
    queryFn: () => getOtherUserData({ userId }),
  });

  if (error) {
    console.log(error);
  }

  // {
  //   "creator_id": 0, 채팅거는 사람 id
  //   "participants": [
  //     0 상대방 id
  //   ],
  //   "roomType": "string", DM
  //   "basket_ball_id": 0,
  //   "name": "string" 상대방 프로필 이름
  // }

  if (isLoggedIn === 'true' && user) {
    return (
      <>
        <title>슬램톡 | 유저 프로필</title>
        <div
          className={`${isVisible ? '' : 'hidden'} z-60 absolute left-6 top-16 min-w-72 rounded-xl border-1 bg-background shadow-lg sm:left-4`}
        >
          <Button
            isIconOnly
            className="bg-gradient absolute right-2 top-2"
            onClick={onClose}
            aria-label="Close"
          >
            <IoIosClose size={30} />
          </Button>
          <h2 className="pt-4 text-center text-lg font-semibold">
            {user.nickname}님의 프로필
          </h2>
          <hr className="w-90 my-4 h-px bg-gray-300" />
          <div className="mx-auto flex max-w-md flex-col gap-3 p-4">
            <div className="flex flex-col items-center gap-3">
              <Avatar size="lg" alt="profile-img" src={user.imageUrl} />
              <p className="text-xl font-semibold">{user.nickname}</p>
              <Input
                isDisabled
                className="h-10 w-full"
                size="sm"
                label="소개 한마디"
                value={user.selfIntroduction ? user.selfIntroduction : ''}
              />
            </div>
            <div className="mt-4 flex w-full justify-center gap-10">
              <div className="flex w-1/3 flex-col gap-5 opacity-100">
                <Select
                  isDisabled
                  className="max-w-xs font-semibold"
                  radius="sm"
                  labelPlacement="outside"
                  label="포지션"
                  defaultSelectedKeys={[`${user.basketballPosition}`]}
                  placeholder="포지션"
                  variant="bordered"
                >
                  {basketballUserPositionData.map((position) => (
                    <SelectItem key={position.value} value={position.value}>
                      {position.value}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  isDisabled
                  className="max-w-xs font-semibold"
                  radius="sm"
                  labelPlacement="outside"
                  label="농구 실력"
                  defaultSelectedKeys={[`${user.basketballSkillLevel}`]}
                  placeholder="농구 실력"
                  variant="bordered"
                >
                  {basketballUserSkillData.map((skill) => (
                    <SelectItem key={skill.value} value={skill.value}>
                      {skill.value}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold">활동 내역</p>
                <Card>
                  <CardBody>
                    <div className="flex flex-col gap-3 text-sm">
                      <p className="underline underline-offset-2">
                        Lv.{user.level === 0 ? 1 : user.level}
                      </p>
                      <p>
                        팀 매칭 횟수:{' '}
                        {user.teamMatchingCompleteParticipationCount}
                      </p>
                      <p>
                        농구 메이트 참여: {user.mateCompleteParticipationCount}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default UserProfile;
