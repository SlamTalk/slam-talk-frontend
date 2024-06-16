/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-useless-escape */

'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Textarea,
  Input,
  Select,
  RadioGroup,
  Radio,
  SelectItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { IoIosClose } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';
import axiosInstance from '@/app/api/axiosInstance';
import { BasketballCourtReportAdmin } from '@/types/basketballCourt/basketballCourtReport';
import { convertCourtData } from '@/utils/convertCourtData';
import { CameraIcon } from '@/app/map/components/icons/CameraIcon';
import { ErrorMessage } from '@hookform/error-message';
import {
  basketballConvenience,
  basketballCourtSize,
  basketballCourtType,
} from '@/constants/courtReportData';

interface EditAdminCourtDetailsProps {
  data: BasketballCourtReportAdmin;
  handleEditClose: () => void;
}

const EditAdminCourtDetails: React.FC<EditAdminCourtDetailsProps> = ({
  data,
  handleEditClose,
}) => {
  const { isOpen, onOpen } = useDisclosure();
  const [editSuccess, setEditSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.photoUrl);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasketballCourtReportAdmin>({
    defaultValues: data,
  });

  const MAX_FILE_SIZE_MB = 1;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`파일 크기는 ${MAX_FILE_SIZE_MB}MB를 초과할 수 없습니다.`);
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

  const onSubmit: SubmitHandler<BasketballCourtReportAdmin> = async (data) => {
    const formData = new FormData();

    if (file) {
      formData.append('image', file);
    }

    const finalData = convertCourtData(data);

    formData.append(
      'data',
      new Blob([JSON.stringify(finalData)], {
        type: 'application/json',
      })
    );

    try {
      const response = await axiosInstance.patch(
        `/api/map/report/edit/${data.courtId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setEditSuccess(true);
        onOpen();
      }
    } catch (error) {
      setEditSuccess(false);
      onOpen();
    }
  };

  if (data) {
    return (
      <>
        <title>슬램톡 | 관리자</title>
        <div
          className={`absolute inset-0 z-20 m-auto w-full max-w-md overflow-y-auto rounded-lg
    bg-background text-sm shadow-md transition-all duration-300 ease-in-out
    md:max-h-[90vh] md:text-lg lg:text-xl`}
        >
          <div className="relative h-full overflow-y-auto">
            <div className="sticky top-0 z-30 flex h-14 w-full items-center justify-center border-b bg-background">
              <p className="text-center text-xl font-semibold">
                농구장 제보하기
              </p>
              <Button
                size="sm"
                radius="full"
                variant="light"
                isIconOnly
                className="absolute right-2 top-2"
                onClick={handleEditClose}
                aria-label="Close"
              >
                <IoIosClose size={30} />
              </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative flex h-52 w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
                <div className="absolute top-0 z-10 flex h-8 w-full items-center justify-center bg-yellow-200 px-4 font-semibold">
                  <p className="text-sm text-black sm:text-xs">
                    농구장 정보를 정확하게 확인하고 제보 데이터 수정 후
                    수락해주세요.
                  </p>
                </div>
                <div>
                  <Button
                    className="z-10 mt-2"
                    color="primary"
                    radius="full"
                    startContent={
                      // eslint-disable-next-line jsx-a11y/label-has-associated-control
                      <label htmlFor="fileInput">
                        <CameraIcon />
                      </label>
                    }
                  >
                    <label htmlFor="fileInput">
                      <span className="font-medium">
                        {file || previewUrl ? '사진 변경' : '사진 추가'}
                      </span>
                    </label>
                  </Button>
                </div>
                <input
                  className="hidden"
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleFileChange}
                />
                {previewUrl && (
                  <>
                    <Button
                      size="sm"
                      radius="full"
                      aria-label="삭제"
                      startContent={<FaTrashCan size={16} />}
                      className="absolute bottom-2 right-2 z-30 gap-1 bg-gray-400 p-1 font-bold text-white"
                      onClick={handleFileDelete}
                    >
                      삭제
                    </Button>
                    <img
                      src={previewUrl}
                      alt="미리보기"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </>
                )}
              </div>
              <div className="mt-2 flex flex-col p-4">
                <Input
                  defaultValue={data.courtName}
                  className="z-10 font-semibold"
                  radius="sm"
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  type="string"
                  label="농구장명"
                  placeholder="농구장명을 입력해 주세요."
                  {...register('courtName', {
                    required: true,
                    minLength: {
                      value: 2,
                      message:
                        '농구장 이름을 2자 이상 30자 이하로 입력해 주세요.',
                    },
                    maxLength: {
                      value: 30,
                      message:
                        '농구장 이름을 2자 이상 30자 이하로 입력해 주세요.',
                    },
                  })}
                />
                <div className="flex h-6 items-center">
                  <ErrorMessage
                    errors={errors}
                    name="courtName"
                    render={({ message }) => (
                      <p className="text-xs text-danger">{message}</p>
                    )}
                  />
                </div>
                <div className="w-full text-sm">
                  <p className="font-semibold">주소</p>
                  <p>{data.address}</p>
                </div>
                <div className="flex gap-4 pt-6 md:flex-nowrap">
                  <Select
                    defaultSelectedKeys={data.courtType ? [data.courtType] : []}
                    className="z-10 max-w-xs font-semibold"
                    radius="sm"
                    labelPlacement="outside"
                    label="코트 종류"
                    placeholder="코트 종류"
                    variant="bordered"
                    {...register('courtType')}
                  >
                    {basketballCourtType.map((courtType) => (
                      <SelectItem key={courtType.value} value={courtType.value}>
                        {courtType.value}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    defaultSelectedKeys={data.courtSize ? [data.courtSize] : []}
                    className="z-10 max-w-xs font-semibold"
                    radius="sm"
                    labelPlacement="outside"
                    label="코트 사이즈"
                    placeholder="코트 사이즈"
                    variant="bordered"
                    {...register('courtSize')}
                  >
                    {basketballCourtSize.map((courtSize) => (
                      <SelectItem key={courtSize.value} value={courtSize.value}>
                        {courtSize.value}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Input
                  defaultValue={data.hoopCount ? data.hoopCount.toString() : ''}
                  className="z-10 pt-6 font-semibold"
                  radius="sm"
                  labelPlacement="outside"
                  variant="bordered"
                  type="number"
                  label="골대 수"
                  placeholder="농구장 골대 수를 입력해 주세요."
                  {...register('hoopCount', {
                    min: {
                      value: 1,
                      message: '농구장 골대 수를 1개 이상으로 입력해 주세요.',
                    },
                    max: {
                      value: 30,
                      message: '농구장 골대 수를 30개 이하로 입력해 주세요.',
                    },
                  })}
                />
                <div className="flex h-6 items-center">
                  <ErrorMessage
                    errors={errors}
                    name="hoopCount"
                    render={({ message }) => (
                      <p className="text-xs text-danger">{message}</p>
                    )}
                  />
                </div>
                <Select
                  defaultSelectedKeys={data.convenience || []}
                  className="z-10 font-semibold"
                  radius="sm"
                  labelPlacement="outside"
                  label="편의시설"
                  placeholder="편의시설"
                  selectionMode="multiple"
                  variant="bordered"
                  {...register('convenience')}
                >
                  {basketballConvenience.map((convenience) => (
                    <SelectItem
                      key={convenience.value}
                      value={convenience.value}
                    >
                      {convenience.value}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  defaultValue={data.phoneNum || ''}
                  className="z-10 pt-6 font-semibold sm:pb-2"
                  radius="sm"
                  labelPlacement="outside"
                  variant="bordered"
                  type="tel"
                  label="전화번호"
                  placeholder="대표 전화번호를 입력해 주세요."
                  {...register('phoneNum', {
                    pattern: {
                      value: /^\d{2,3}-?\d{3,4}-?\d{4}$/,
                      message:
                        '전화번호 형식으로 입력해 주세요. 00-000-0000 또는 000-0000-0000',
                    },
                  })}
                />
                <div className="flex h-6 items-center sm:pb-2">
                  <ErrorMessage
                    errors={errors}
                    name="phoneNum"
                    render={({ message }) => (
                      <p className="text-xs text-danger">{message}</p>
                    )}
                  />
                </div>
                <Input
                  defaultValue={data.website || ''}
                  className="z-10 text-sm font-semibold"
                  radius="sm"
                  labelPlacement="outside"
                  variant="bordered"
                  type="url"
                  label="홈페이지"
                  placeholder="관련 홈페이지를 입력해 주세요."
                  {...register('website', {
                    pattern: {
                      value:
                        /(http[s]?|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/g,
                      message: '홈페이지 링크를 입력해 주세요.',
                    },
                  })}
                />
                <div className="flex h-6 items-center">
                  <ErrorMessage
                    errors={errors}
                    name="website"
                    render={({ message }) => (
                      <p className="text-xs text-danger">{message}</p>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Controller
                    defaultValue={data.indoorOutdoor}
                    control={control}
                    name="indoorOutdoor"
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        defaultValue={data.indoorOutdoor || ''}
                        onChange={(value) => onChange(value)}
                        className="text-sm font-semibold"
                        label="실내외"
                        orientation="horizontal"
                      >
                        <Radio value="실내">실내</Radio>
                        <Radio value="야외">야외</Radio>
                      </RadioGroup>
                    )}
                  />
                  <Controller
                    defaultValue={data.nightLighting}
                    control={control}
                    name="nightLighting"
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        defaultValue={data.nightLighting || ''}
                        onChange={(value) => onChange(value)}
                        className="text-sm font-semibold"
                        label="야간 조명"
                        orientation="horizontal"
                      >
                        <Radio value="있음">있음</Radio>
                        <Radio value="없음">없음</Radio>
                      </RadioGroup>
                    )}
                  />
                  <Controller
                    defaultValue={data.openingHours}
                    control={control}
                    name="openingHours"
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        defaultValue={data.openingHours || ''}
                        onChange={(value) => onChange(value)}
                        className="text-sm font-semibold"
                        label="개방 시간"
                        orientation="horizontal"
                      >
                        <Radio value="제한">제한</Radio>
                        <Radio value="24시">24시</Radio>
                      </RadioGroup>
                    )}
                  />
                  <Controller
                    defaultValue={data.fee}
                    control={control}
                    name="fee"
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        defaultValue={data.fee || ''}
                        onChange={(value) => onChange(value)}
                        className="text-sm font-semibold"
                        label="사용료"
                        orientation="horizontal"
                      >
                        <Radio value="무료">무료</Radio>
                        <Radio value="유료">유료</Radio>
                      </RadioGroup>
                    )}
                  />
                  <Controller
                    defaultValue={data.parkingAvailable}
                    control={control}
                    name="parkingAvailable"
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        defaultValue={data.parkingAvailable || ''}
                        onChange={(value) => onChange(value)}
                        className="text-sm font-semibold"
                        label="주차 여부"
                        orientation="horizontal"
                      >
                        <Radio value="가능">가능</Radio>
                        <Radio value="불가능">불가능</Radio>
                      </RadioGroup>
                    )}
                  />
                </div>

                <div className="mt-6 w-full">
                  <Textarea
                    defaultValue={data.additionalInfo || ''}
                    radius="sm"
                    maxRows={3}
                    variant="bordered"
                    label="기타 정보"
                    placeholder="해당 농구장에 관한 기타 정보를 입력해 주세요."
                    {...register('additionalInfo', { maxLength: 300 })}
                  />
                </div>
              </div>
              <div className="sticky bottom-0 z-30 flex h-14 items-center border-t bg-background px-4">
                <Button
                  radius="sm"
                  aria-label="수정하기"
                  type="submit"
                  className="text-md w-full bg-primary font-medium text-white"
                >
                  수정하기
                </Button>
              </div>
            </form>
          </div>
          <Modal isOpen={isOpen} onClose={handleEditClose} placement="center">
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    농구장 제보 데이터 수정
                  </ModalHeader>
                  <ModalBody>
                    {editSuccess ? (
                      <p>농구장 제보 데이터 수정이 완료되었습니다.</p>
                    ) : (
                      <p>농구장 제보 데이터 수정에 실패했습니다.</p>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={handleEditClose}>
                      확인
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </>
    );
  }
  return null;
};

export default EditAdminCourtDetails;
