'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react';

const MateMatchingApplication = () => {
  const [skillLevel, setSkillLevel] = useState('');
  const [teamName, setTeamName] = useState('');

  return (
    <div>
      <Image
        src="/images/basketball-team.png"
        width={300}
        height={300}
        alt="Picture of the author"
        className="mx-auto mt-6"
      />
      <div className="mb-2.5">
        <div className="text-md font-bold">팀명</div>
        <Textarea
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="팀명을 입력하세요"
          height={20}
        />
      </div>
      <div className="mb-2.5">
        <div className="text-md font-bold">원하는 실력대</div>
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
      <Button color="primary">지원하기</Button>
    </div>
  );
};

export default MateMatchingApplication;
