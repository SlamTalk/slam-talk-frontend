'use client';

import React from 'react';
import { Button } from '@nextui-org/react';

interface UserSkillProps {
  onSkillSelect: (skill: string) => void;
}

const skillLevels = ['고수', '중수', '하수', '입문'];

const UserSkill: React.FC<UserSkillProps> = ({ onSkillSelect }) => {
  const handleSkillSelect = (selectedSkill: string) => {
    onSkillSelect(selectedSkill);
  };

  return (
    <div className="sm:mt-18 mt-24 flex h-full w-full flex-col align-middle">
      <h1 className="text-center text-4xl font-bold sm:mb-4 sm:text-3xl">
        농구 실력을 알려주세요
      </h1>
      <div className="flex flex-col gap-7 p-20 sm:p-10">
        {skillLevels.map((level) => (
          <Button
            key={level}
            size="lg"
            radius="full"
            className="bg-gradient-to-tr from-primary to-secondary text-xl font-semibold text-white shadow-lg dark:shadow-gray-600"
            onClick={() => handleSkillSelect(level)}
          >
            {level}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default UserSkill;
