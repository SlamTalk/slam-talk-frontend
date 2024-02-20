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
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    const newAppliedTeam = {
      teamName,
      skillLevel,
    };

    newApplyMutation.mutate(newAppliedTeam);

    router.back();
  };

  return (
    <div className="mx-auto mt-20 w-[450px] px-[16px]">
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
          maxLength={30}
          maxRows={1}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="팀명을 입력하세요"
          height={20}
        />
      </div>
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">원하는 실력대</div>
        <Select
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

export default TeamMatchingApplication;
