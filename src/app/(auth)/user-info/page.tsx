'use client';

import React, { useState } from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import { useRouter } from 'next/navigation';
import { Progress } from '@nextui-org/react';
import UserSkill from './components/UserSkill';
import UserPosition from './components/UserPosition';

const SignUpProcess = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'skill' | 'position'>('skill');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const sendUserInfo = async () => {
    try {
      if (selectedSkill !== null && selectedPosition !== null) {
        await axiosInstance.patch('/api/user/update/info', {
          skill: selectedSkill,
          position: selectedPosition,
        });
      }
    } catch (error) {
      console.error('정보 전송 실패:', error);
    }
    router.push('/');
  };

  const goToNextStep = async () => {
    if (currentStep === 'skill') {
      setCurrentStep('position');
    } else {
      sendUserInfo();
    }
  };

  const handleSkillSelect = (skill: string) => {
    const skillMapping: Record<string, string | null> = {
      고수: 'HIGH',
      중수: 'LOW',
      하수: 'MIDDLE',
      입문: 'BEGINNER',
    };
    const updatedSkill = skillMapping[skill];
    setSelectedSkill(updatedSkill);
    if (selectedSkill !== null) {
      goToNextStep();
    }
  };

  const handlePositionSelect = async (position: string) => {
    const positionMapping: Record<string, string | null> = {
      가드: 'GUARD',
      포워드: 'FORWARD',
      센터: 'CENTER',
      몰라요: 'UNDEFINED',
      '이것저것 해요': 'UNSPECIFIED',
    };
    const updatedPosition = positionMapping[position];
    setSelectedPosition(updatedPosition);
    if (selectedPosition !== null) {
      goToNextStep();
    }
  };

  return (
    <div>
      <Progress
        isStriped
        color="primary"
        aria-label="Loading..."
        value={currentStep === 'skill' ? 0 : 50}
      />
      {currentStep === 'skill' && (
        <UserSkill onSkillSelect={handleSkillSelect} />
      )}

      {currentStep === 'position' && (
        <UserPosition onPositionSelect={handlePositionSelect} />
      )}
    </div>
  );
};

export default SignUpProcess;
