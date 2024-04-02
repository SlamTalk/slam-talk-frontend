'use client';

import React, { useState } from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import { useRouter } from 'next/navigation';
import { Progress } from '@nextui-org/react';
import LocalStorage from '@/utils/localstorage';
import { mapPositionToKey, mapSkillToKey } from '@/utils/mappingUtils';
import UserSkill from './components/UserSkill';
import UserPosition from './components/UserPosition';

const SignUpProcess = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const [currentStep, setCurrentStep] = useState<'skill' | 'position'>('skill');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const sendUserInfo = async () => {
    try {
      if (selectedSkill !== null && selectedPosition !== null) {
        await axiosInstance.patch('/api/user/update/info', {
          basketballSkillLevel: selectedSkill,
          basketballPosition: selectedPosition,
        });
      }
    } catch (error) {
      console.error('정보 전송 실패:', error);
    }
    router.push('/');
  };

  const goToNextStep = () => {
    if (currentStep === 'skill') {
      setCurrentStep('position');
    } else {
      sendUserInfo();
    }
  };

  const handleSkillSelect = (skill: string) => {
    const updatedSkill = mapSkillToKey(skill);
    setSelectedSkill(updatedSkill);
    if (selectedSkill !== null) {
      goToNextStep();
    }
  };

  const handlePositionSelect = (position: string) => {
    const updatedPosition = mapPositionToKey(position);
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
