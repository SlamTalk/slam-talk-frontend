'use client';

import React, { useState } from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import UserSkill from './UserSkill';
import UserPosition from './UserPosition';

interface UserInfo {
  skill: string | null;
  position: string | null;
}

const SignUpProcess = () => {
  const [currentStep, setCurrentStep] = useState('skill');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    skill: null,
    position: null,
  });

  const updateUserInfo = (data: Partial<UserInfo>) => {
    setUserInfo({ ...userInfo, ...data });
  };

  const goToNextStep = async () => {
    if (currentStep === 'skill') {
      setCurrentStep('position');
    } else {
      try {
        await axiosInstance.patch('/api/user/update/info', userInfo);
        // 성공 시 처리
      } catch (error) {
        console.error('Position 정보 전송 실패:', error);
      }
    }
  };

  return (
    <div>
      {currentStep === 'skill' && (
        <UserSkill
          onSkillSelect={(skill) => {
            updateUserInfo({ skill });
            goToNextStep();
          }}
        />
      )}

      {currentStep === 'position' && (
        <UserPosition
          onPositionSelect={(position: string) => {
            updateUserInfo({ position });
            goToNextStep();
          }}
        />
      )}
    </div>
  );
};

export default SignUpProcess;
