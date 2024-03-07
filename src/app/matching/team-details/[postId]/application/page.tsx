'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { TeamApplication } from '@/types/matching/teamDataType';
import { useMutation } from '@tanstack/react-query';
import { postNewTeamApplication } from '@/services/matching/postNewTeamApplication';

const TeamMatchingApplication = () => {
  const [skillLevel, setSkillLevel] = useState('');
  const [teamName, setTeamName] = useState('');
  const { postId } = useParams();
  const teamPostId = postId as string;
  const router = useRouter();

  const newApplyMutation = useMutation({
    mutationFn: (newApplication: TeamApplication) =>
      postNewTeamApplication(newApplication, teamPostId),
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
    const newAppliedTeam = {
      teamName,
      skillLevel,
    };

    newApplyMutation.mutate(newAppliedTeam);
  };

  return (
    <form className="mx-auto mt-20 w-[450px] px-[16px]" onSubmit={handleSubmit}>
      <Image
        src="/images/basketball-team.png"
        width={300}
        height={300}
        alt="Picture of the author"
        className="mx-auto mt-6"
      />
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">팀명</div>
        <Textarea
          isRequired
          maxLength={30}
          maxRows={1}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="팀명을 입력하세요"
          height={20}
        />
      </div>
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">내 실력</div>
        <Select
          isRequired
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
            하수
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
        <Button type="submit" className="mx-auto" color="primary">
          지원하기
        </Button>
      </div>
    </form>
  );
};

export default TeamMatchingApplication;
