'use client';

import React from 'react';
import { Button } from '@nextui-org/react';

interface UserPositionProps {
  onPositionSelect: (position: string) => void;
}

const positions = ['가드', '포워드', '센터', '몰라요', '이것저것 해요'];

const UserPosition: React.FC<UserPositionProps> = ({ onPositionSelect }) => {
  const handlePositionSelect = (selectedPosition: string) => {
    onPositionSelect(selectedPosition);
  };
  return (
    <div className="mt-24 flex h-full w-full flex-col align-middle sm:mt-16">
      <h1 className="text-center text-4xl font-bold sm:mb-4 sm:text-3xl">
        포지션을 알려주세요
      </h1>
      <div className="flex flex-col gap-6 p-20 sm:p-10">
        {positions.map((pos) => (
          <Button
            key={pos}
            size="lg"
            radius="full"
            className="bg-gradient-to-tr from-primary to-secondary text-xl font-semibold text-white shadow-lg dark:shadow-gray-600"
            onClick={() => handlePositionSelect(pos)}
          >
            {pos}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default UserPosition;
