'use client';

import React, { useState } from 'react';
import { Input, Button, Textarea, Select, SelectItem } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { createMatePost } from '@/services/matching/postNewMatePost';
import KakaoMapModal from '../components/KakaoMapModal';
import { NewMateData } from '../../../types/matching/mateNewPostType';

const MateNewPostPage = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [centerCount, setCenterCount] = useState('0');
  const [forwardCount, setForwardCount] = useState('0');
  const [guardCount, setGuardCount] = useState('0');
  const [unspecifiedCount, setUnspecifiedCount] = useState('0');
  const [skillLevel, setSkillLevel] = useState('');
  const [details, setDetails] = useState('');
  const router = useRouter();

  const createPostMutation = useMutation<AxiosResponse, Error, NewMateData>({
    mutationFn: createMatePost,
    onSuccess: () => {
      console.log('success');
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleOpenMap = () => {
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  const handleSelectAddress = (selectedAddress: string) => {
    setAddress(selectedAddress);
    handleCloseMap();
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = startDate ? formatDate(startDate) : '';

    const newMateData: NewMateData = {
      title,
      content: details,
      scheduledDate: formattedDate,
      startTime,
      endTime,
      locationDetail: address,
      skillLevel,
      maxParticipantsCenters: parseInt(centerCount, 10),
      maxParticipantsGuards: parseInt(guardCount, 10),
      maxParticipantsForwards: parseInt(forwardCount, 10),
      maxParticipantsOthers: parseInt(unspecifiedCount, 10),
    };

    console.log({ newMateData });
    createPostMutation.mutate(newMateData);
    router.push('/matching');
  };

  const handleCenterCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      e.target.value === ''
        ? ''
        : String(Math.max(0, parseInt(e.target.value, 10)));
    setCenterCount(newValue);
  };

  const handleForwardCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      e.target.value === ''
        ? ''
        : String(Math.max(0, parseInt(e.target.value, 10)));
    setForwardCount(newValue);
  };

  const handleGuardCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      e.target.value === ''
        ? ''
        : String(Math.max(0, parseInt(e.target.value, 10)));
    setGuardCount(newValue);
  };

  const handleUnspecifiedCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue =
      e.target.value === ''
        ? ''
        : String(Math.max(0, parseInt(e.target.value, 10)));
    setUnspecifiedCount(newValue);
  };

  return (
    <form className="relative p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="text-md font-bold">제목</div>
        <Input
          id="title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* 주소 선택 필드 */}
      <div className="mb-2.5">
        <div className="text-md font-bold">장소</div>
        <div className="relative">
          <Input
            disabled
            id="address"
            placeholder="주소를 입력하세요"
            value={address}
          />
          <Button
            className="absolute right-0 top-0 mr-[8px] mt-[8px]"
            onClick={handleOpenMap}
          >
            주소 찾기
          </Button>
        </div>
      </div>

      {/* 날짜 선택 필드 */}
      <div className="mb-2.5">
        <div className="text-md font-bold">날짜</div>
        <div className="rounded-md bg-gray-100 p-2 dark:bg-default-100">
          <DatePicker
            dateFormat="YYYY년 MM월 dd일"
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            className="w-full bg-gray-100 dark:bg-default-100"
          />
        </div>
      </div>

      {/* 시간 선택 필드 */}
      <div className="mb-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1">
            <div className="text-md font-bold">시작 시간</div>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full"
              min="00:00"
              max="23:59"
            />
          </div>
          <div className="flex-1">
            <div className="text-md font-bold">종료 시간</div>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full"
              min="00:00"
              max="23:59"
            />
          </div>
        </div>
      </div>
      {/* 포지션 별 인원 수 필드 */}
      <div className="relative z-0 mb-4">
        <div className="text-md font-bold">포지션 별 인원 수</div>
        <div className="flex justify-between space-x-2">
          <Input
            label="센터"
            type="number"
            value={centerCount}
            onChange={handleCenterCountChange}
            min="0"
            className="flex-1"
          />
          <Input
            label="포워드"
            type="number"
            value={forwardCount}
            onChange={handleForwardCountChange}
            min="0"
            className="flex-1"
          />
          <Input
            label="가드"
            type="number"
            value={guardCount}
            onChange={handleGuardCountChange}
            min="0"
            className="flex-1"
          />
          <Input
            label="무관"
            type="number"
            value={unspecifiedCount}
            onChange={handleUnspecifiedCountChange}
            min="0"
            className="flex-1"
          />
        </div>
      </div>
      {/* 원하는 실력대 필드 */}
      <div className="mb-2.5">
        <div className="text-md font-bold">원하는 실력대</div>
        <Select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="w-full"
          placeholder="실력대를 선택하세요"
        >
          <SelectItem key="OVER_BEGINNER" value="OVER_BEGINNER">
            입문 이상
          </SelectItem>
          <SelectItem key="BEGINNER" value="BEGINNER">
            입문 이하
          </SelectItem>
          <SelectItem key="OVER_LOW" value="OVER_LOW">
            하수 이상
          </SelectItem>
          <SelectItem key="UNDER_LOW" value="UNDER_LOW">
            하수 이하
          </SelectItem>
          <SelectItem key="OVER_MIDDLE" value="OVER_MIDDLE">
            중수 이상
          </SelectItem>
          <SelectItem key="UNDER_MIDDLE" value="UNDER_MIDDLE">
            중수 이하
          </SelectItem>
          <SelectItem key="HIGH" value="HIGH">
            고수 이상
          </SelectItem>
          <SelectItem key="UNDER_HIGH" value="UNDER_HIGH">
            고수 이하
          </SelectItem>
        </Select>
      </div>
      {/* 세부사항 필드 */}
      <div className="mb-2.5">
        <div className="text-md font-bold">세부사항</div>
        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="세부사항을 입력하세요"
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit" color="primary">
          작성 완료
        </Button>
      </div>
      <KakaoMapModal
        visible={isMapOpen}
        onClose={handleCloseMap}
        onSelectAddress={handleSelectAddress}
      />
    </form>
  );
};

export default MateNewPostPage;
