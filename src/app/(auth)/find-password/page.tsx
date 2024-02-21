'use client';

import { validateEmail } from '@/utils/validations';
import { Button, Input } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';

const PasswordPage = () => {
  const [email, setEmail] = useState('');
  const isEmailInvalid = useMemo(
    () => !validateEmail(email) && email !== '',
    [email]
  );

  const handleSendEmail = () => {
    alert(`구현 예정) ${email}으로 비밀번호 변경 이메일을 발송했습니다.`);
  };

  return (
    <>
      <title>슬램톡 | 비밀번호 찾기</title>
      <div className="mt-14 flex h-full w-full flex-col flex-wrap justify-center gap-3 p-5 align-middle md:flex-nowrap">
        <h1 className="mb-4 text-2xl font-bold sm:text-xl">비밀번호 재설정</h1>
        <Input
          isClearable
          isRequired
          type="email"
          labelPlacement="outside"
          label="이메일"
          value={email}
          onValueChange={setEmail}
          onClear={() => setEmail('')}
          placeholder="이메일"
          isInvalid={isEmailInvalid}
        />
        <div
          className={`mb-3 h-3 text-sm text-danger ${isEmailInvalid ? 'visible' : 'invisible'}`}
        >
          {isEmailInvalid && '올바른 이메일을 입력해 주세요.'}
        </div>
        <Button
          size="lg"
          radius="full"
          color="primary"
          onClick={handleSendEmail}
        >
          메일 발송
        </Button>
      </div>
    </>
  );
};

export default PasswordPage;
