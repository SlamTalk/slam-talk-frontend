'use client';

import {
  basketballUserPositionData,
  basketballUserSkillData,
} from '@/constants/basketballUserData';
import { getUserData } from '@/services/user/getUserData';
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
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';

// [TO DO] 뒤로 가기 넣기 ✅
// 닉네임, 이메일, 한마디, 포지션, 농구 실력, 활동 내역(레벨, 팀 매칭 횟수, 농구 메이트 참여 횟수)를 표시
// 추가 정보: 소셜
// 프로필 수정하기

// eslint-disable-next-line consistent-return
const MyProfile = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const router = useRouter();

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const handleGoBack = () => {
    router.back();
  };

  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  if (error) {
    console.log(error);
  }

  if (user) {
    return (
      <>
        <title>슬램톡 | 내 프로필</title>
        <div className="relative">
          <div
            aria-label="뒤로가기"
            role="link"
            tabIndex={0}
            className="absolute left-4 top-4"
            onClick={handleGoBack}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGoBack();
              }
            }}
          >
            <IoChevronBackSharp size={24} />
          </div>
          <h2 className="pt-4 text-center text-lg font-semibold">내 프로필</h2>
          <hr className="w-90 my-4 h-px bg-gray-300" />
          <div className="mx-auto flex max-w-md flex-col gap-4 p-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar size="lg" alt="profile-img" src={user.imageUrl} />
              <p className="text-xl font-semibold">{user.nickname}</p>
              {/* {user.socialType} */}
              <span className="text-sm">{user.email}</span>
              <Input
                isDisabled
                className="h-10 w-full"
                size="sm"
                label="소개 한마디"
                value={user.selfIntroduction ? user.selfIntroduction : ''}
              />
            </div>
            <div className="mt-8 flex w-full justify-center gap-10">
              <div className="flex w-1/3 flex-col gap-5 opacity-100">
                <Select
                  // isDisabled
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
                  // isDisabled
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
                    <div className="flex flex-col gap-4 text-sm">
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
            <div className="mt-8">
              <Button color="primary" radius="sm" size="md" className="w-full">
                프로필 수정하기
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default MyProfile;
