'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { postNewApplication } from '@/services/matching/postNewApplication';
import { ParticipantApplication } from '@/app/matching/components/MateDataType';

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
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    newApplyMutation.mutate({
      applyStatus: 'WAITING',
      position,
      skillLevel,
    });

    router.back();
  };

  return (
    <div className="mx-auto mt-20 w-[450px] px-[16px]">
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
          aria-label="포지션 선택"
          value={position}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPosition(e.target.value)
          }
          className="w-full"
          placeholder="포지션을 선택하세요"
        >
          <SelectItem key="CENTER" value="CENTER">
            센터
          </SelectItem>
          <SelectItem key="FORWARD" value="FORWARD">
            포워드
          </SelectItem>
          <SelectItem key="GUARD" value="GUARD">
            가드
          </SelectItem>
          <SelectItem key="UNSPECIFIED" value="UNSPECIFIED">
            무관
          </SelectItem>
        </Select>
      </div>
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">원하는 실력대</div>
        <Select
          aria-label="내 실력 선택"
          value={skillLevel}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSkillLevel(e.target.value)
          }
          className="w-full"
          placeholder="실력대를 선택하세요"
        >
          <SelectItem key="BEGINNER" value="BEGINNER">
            입문
          </SelectItem>
          <SelectItem key="LOW" value="LOW">
            초보
          </SelectItem>
          <SelectItem key="MIDDLE" value="MIDDLE">
            중수
          </SelectItem>
          <SelectItem key="HIGH" value="HIGH">
            고수
          </SelectItem>
        </Select>
      </div>
      <div className="mt-10 flex w-full">
        <Button className="mx-auto" color="primary" onClick={handleSubmit}>
          지원하기
        </Button>
      </div>
    </div>
  );
};

export default MateMatchingApplication;
