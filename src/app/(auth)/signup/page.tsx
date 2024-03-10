'use client';

import React, { useState } from 'react';
import EmailValidation from './components/EmailValidation';
import NicknamePassword from './components/NicknamePassword';

const SignUp = () => {
  const [emailValidate, setEmailValidate] = useState(false);
  const [validEmail, setValidEmail] = useState('');

  const handleEmailValidate = (email: string) => {
    setEmailValidate(true);
    setValidEmail(email);
  };

  return (
    <>
      <title>슬램톡 | 회원가입</title>
      <div className="flex h-full w-full flex-col flex-wrap gap-2 p-4 md:flex-nowrap">
        {!emailValidate ? (
          <EmailValidation onEmailValidate={handleEmailValidate} />
        ) : (
          <NicknamePassword validEmail={validEmail} />
        )}
      </div>
    </>
  );
};

export default SignUp;
