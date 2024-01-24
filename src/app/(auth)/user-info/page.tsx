'use client';

import React, { useState } from 'react';
// import axiosInstance from '@/app/api/axiosInstance';
import { useRouter } from 'next/navigation';
import UserSkill from './UserSkill';
import UserPosition from './UserPosition';

interface UserInfo {
  skill: string | null;
  position: string | null;
}

const SignUpProcess = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'skill' | 'position'>('skill');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    skill: null,
    position: null,
  });

  const updateUserInfo = (data: Partial<UserInfo>) => {
    const updatedUserInfo = { ...userInfo, ...data };
    setUserInfo(updatedUserInfo);
  };

  const goToNextStep = async () => {
    if (currentStep === 'skill') {
      setCurrentStep('position');
    } else {
      try {
        // await axiosInstance.patch('/api/user/update/info', userInfo);
        router.push('/');
      } catch (error) {
        console.error('정보 전송 실패:', error);
      }
    }
  };

  const handleSkillSelect = (skill: string) => {
    updateUserInfo({ skill });
    goToNextStep();
  };

  const handlePositionSelect = (position: string) => {
    updateUserInfo({ position });
    goToNextStep();
  };

  return (
    <div>
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
