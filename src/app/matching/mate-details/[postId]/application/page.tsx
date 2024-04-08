'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { postNewApplication } from '@/services/matching/postNewApplication';
import { ParticipantApplication } from '@/types/matching/mateDataType';
import {
  basketballSkillData,
  basketballPositionApplyData,
} from '@/constants/basketballInfoData';

const MateMatchingApplication = () => {
  const [skillLevel, setSkillLevel] = useState('');
  const [position, setPosition] = useState('');
  const { postId } = useParams();
  const matePostId = postId as string;
  const router = useRouter();

  const newApplyMutation = useMutation({
    mutationFn: (newApplication: ParticipantApplication) =>
      postNewApplication(newApplication, matePostId),
    onSuccess: () => {
      console.log('success');
      router.back();
    },
    onError: (error: Error) => {
      console.log(error);
      alert('이미 신청한 모집입니다.');
      router.back();
    },
  });

  const handleSubmit = () => {
    newApplyMutation.mutate({
      applyStatus: 'WAITING',
      position,
      skillLevel,
    });
  };

  return (
    <form className="mx-auto mt-20 w-[450px] px-[16px]" onSubmit={handleSubmit}>
      <Image
        src="/images/basketball-mate.png"
        width={300}
        height={300}
        alt="Picture of the author"
        className="mx-auto mt-6"
        priority
      />
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">포지션</div>
        <Select
          isRequired
          aria-label="포지션 선택"
          value={position}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPosition(e.target.value)
          }
          className="w-full"
          placeholder="포지션을 선택하세요"
        >
          {basketballPositionApplyData.map((selectedPosition) => (
            <SelectItem
              key={selectedPosition.value}
              value={selectedPosition.value}
            >
              {selectedPosition.value}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">내 실력</div>
        <Select
          isRequired
          aria-label="내 실력 선택"
          value={skillLevel}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSkillLevel(e.target.value)
          }
          className="w-full"
          placeholder="실력대를 선택하세요"
        >
          {basketballSkillData.map((level) => (
            <SelectItem key={level.key} value={level.key}>
              {level.value}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="mt-10 flex w-full">
        <Button type="submit" className="mx-auto" color="primary">
          지원하기
        </Button>
      </div>
    </form>
  );
};

export default MateMatchingApplication;
