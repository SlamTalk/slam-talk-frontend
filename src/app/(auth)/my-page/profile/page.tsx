/* eslint-disable no-param-reassign */

'use client';

import { getUserData } from '@/services/user/getUserData';
import LocalStorage from '@/utils/localstorage';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import axiosInstance from '@/app/api/axiosInstance';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { mapPositionToKey, mapSkillToKey } from '@/utils/mappingUtils';
import {
  basketballPositionUserData,
  basketballSkillData,
} from '@/constants/basketballInfoData';

export interface ProfileEdit {
  file: File | null;
  nickname: string;
  selfIntroduction: string | null;
  basketballSkillLevel: string | null;
  basketballPosition: string | null;
}

const MyProfile = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [editSuccess, SetEditSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEdit>();

  const onSubmit: SubmitHandler<ProfileEdit> = async (data) => {
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }

    if (data.basketballPosition !== null) {
      data.basketballPosition = mapPositionToKey(data.basketballPosition);
    }

    if (data.basketballSkillLevel !== null) {
      data.basketballSkillLevel = mapSkillToKey(data.basketballSkillLevel);
    }

    formData.append(
      'data',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      })
    );

    try {
      await axiosInstance.post('/api/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEdit(false);
      SetEditSuccess(true);
      onOpen();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setErrorMsg(error.response.data.message);
      }
      SetEditSuccess(false);
      onOpen();
    }
  };

  const MAX_FILE_SIZE_MB = 1;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(true);
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMsg(`파일 크기는 ${MAX_FILE_SIZE_MB}MB를 초과할 수 없습니다.`);
        onOpen();
        e.target.value = '';
      } else {
        setFile(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(imageUrl);
      }
    }
  };

  const resetPreview = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleFileDelete = () => {
    resetPreview();
  };

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const handleGoBack = () => {
    router.back();
  };

  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  if (error) {
    console.log(error);
  }

  if (user) {
    return (
      <>
        <title>슬램톡 | 내 프로필</title>
        <div className="relative h-full w-full">
          <div
            aria-label="뒤로가기"
            role="link"
            tabIndex={0}
            className="absolute left-4 top-4"
            onClick={handleGoBack}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGoBack();
              }
            }}
          >
            <IoChevronBackSharp size={24} />
          </div>
          <h2 className="pt-4 text-center text-lg font-semibold">내 프로필</h2>
          <hr className="w-90 my-4 h-px bg-gray-300" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto flex h-full max-w-md flex-col gap-4 p-4">
              <div className="flex items-center">
                <Avatar
                  className="mr-4 h-20 w-20 text-large"
                  alt="프로필 사진"
                  src={previewUrl || user.imageUrl}
                />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      className="hidden"
                      id="fileInput"
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={handleFileChange}
                    />
                    <Button
                      size="sm"
                      color="primary"
                      radius="sm"
                      startContent={
                        // eslint-disable-next-line jsx-a11y/label-has-associated-control
                        <label htmlFor="fileInput">사진 변경</label>
                      }
                    />
                    {file && (
                      <Button
                        size="sm"
                        radius="sm"
                        aria-label="삭제"
                        className="bg-gray-400 text-white"
                        onClick={handleFileDelete}
                      >
                        삭제
                      </Button>
                    )}
                  </div>
                  <p className="text-xs">
                    확장자: png, jpg, jpeg / 용량: 1MB 이하
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {user.socialType === 'NAVER' && (
                  <Image
                    className="rounded-sm"
                    alt="네이버 아이콘"
                    height={16}
                    width={20}
                    src="/icons/naver-icon.png"
                  />
                )}
                {user.socialType === 'KAKAO' && (
                  <Image
                    className="rounded-sm"
                    alt="카카오 아이콘"
                    height={16}
                    width={20}
                    src="/icons/kakao-icon.png"
                  />
                )}
                {user.socialType === 'GOOGLE' && (
                  <Image
                    className="rounded-sm"
                    alt="구글 아이콘"
                    height={16}
                    width={20}
                    src="/icons/google-icon.png"
                  />
                )}
                {user.socialType === 'LOCAL' && (
                  <Image
                    alt="슬램톡 아이콘"
                    height={16}
                    width={20}
                    src="/icons/basketball-icon.png"
                  />
                )}
                <span className="text-sm">{user.email}</span>
              </div>

              <div className="flex flex-col">
                <Input
                  minLength={2}
                  maxLength={13}
                  isRequired
                  radius="sm"
                  className="h-10 w-full"
                  labelPlacement="outside"
                  type="string"
                  label="닉네임"
                  placeholder="특수 문자 제외 2자 이상 13자 이하"
                  defaultValue={user.nickname}
                  onValueChange={() => setEdit(true)}
                  {...register('nickname', {
                    required: true,
                    minLength: {
                      value: 2,
                      message: '닉네임을 2자 이상 입력해 주세요.',
                    },
                    maxLength: {
                      value: 13,
                      message: '닉네임을 13자 이하로 입력해 주세요.',
                    },
                    pattern: {
                      value: /^[A-Za-z0-9가-힣]+$/,
                      message:
                        '닉네임을 특수 문자 제외 2자 이상 13자 이하로 입력해 주세요.',
                    },
                  })}
                />
                <div className="my-4 flex h-4 items-center">
                  <ErrorMessage
                    errors={errors}
                    name="nickname"
                    render={({ message }) => (
                      <p className="text-xs text-danger">{message}</p>
                    )}
                  />
                </div>
                <Textarea
                  minRows={6}
                  maxLength={200}
                  radius="sm"
                  className="mb-4"
                  labelPlacement="outside"
                  type="string"
                  label="자기소개"
                  placeholder="200자 이하 작성"
                  defaultValue={
                    user.selfIntroduction ? user.selfIntroduction : ''
                  }
                  onValueChange={() => setEdit(true)}
                  {...register('selfIntroduction')}
                />
              </div>
              <Divider />
              <div className="flex w-full gap-10">
                <div className="flex w-1/2 flex-col gap-5 opacity-100">
                  <Select
                    className="font-semibold"
                    radius="sm"
                    labelPlacement="outside"
                    label="포지션"
                    defaultSelectedKeys={[`${user.basketballPosition}`]}
                    placeholder="포지션"
                    variant="bordered"
                    onSelectionChange={() => setEdit(true)}
                    {...register('basketballPosition')}
                  >
                    {basketballPositionUserData.map((position) => (
                      <SelectItem key={position.value} value={position.value}>
                        {position.value}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    className="font-semibold"
                    radius="sm"
                    labelPlacement="outside"
                    label="농구 실력"
                    defaultSelectedKeys={[`${user.basketballSkillLevel}`]}
                    placeholder="농구 실력"
                    variant="bordered"
                    onSelectionChange={() => setEdit(true)}
                    {...register('basketballSkillLevel')}
                  >
                    {basketballSkillData.map((skill) => (
                      <SelectItem key={skill.value} value={skill.value}>
                        {skill.value}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="w-1/2">
                  <p className="mb-2 text-sm font-semibold">활동 내역</p>
                  <Card>
                    <CardBody>
                      <div className="flex flex-col gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold underline underline-offset-2">
                            Lv.{user.level}
                          </p>
                          <Tooltip
                            placement="right"
                            showArrow
                            content={`${user.levelScore}점 - 10점마다 Level Up!`}
                          >
                            <Button
                              size="sm"
                              isIconOnly
                              radius="full"
                              aria-label="레벨 점수"
                              variant="light"
                            >
                              <IoMdInformationCircleOutline size={20} />
                            </Button>
                          </Tooltip>
                        </div>
                        <p>
                          <span className="font-semibold">팀 매칭 횟수: </span>
                          {user.teamMatchingCompleteParticipationCount}번
                        </p>
                        <p>
                          <span className="font-semibold">
                            농구 메이트 참여 횟수:{' '}
                          </span>
                          {user.mateCompleteParticipationCount}번
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>

            <div className="sticky bottom-12 z-20 mx-auto mt-8 h-fit w-full bg-background px-4 py-2 sm:border-t md:px-20">
              {edit ? (
                <Button
                  aria-label="프로필 수정 완료"
                  color="primary"
                  radius="sm"
                  size="md"
                  className="w-full"
                  type="submit"
                >
                  프로필 수정 완료
                </Button>
              ) : (
                <Button
                  color="primary"
                  radius="sm"
                  size="md"
                  className="w-full"
                  isDisabled
                >
                  프로필 수정 완료
                </Button>
              )}
            </div>
          </form>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  프로필 수정
                </ModalHeader>
                <ModalBody>
                  {editSuccess ? (
                    <p>프로필 수정이 완료되었습니다.</p>
                  ) : (
                    <p className="text-danger">
                      {errorMsg ||
                        '프로필 수정이 실패했습니다. 잠시 후 다시 시도해주세요.'}
                    </p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    확인
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  return null;
};

export default MyProfile;
