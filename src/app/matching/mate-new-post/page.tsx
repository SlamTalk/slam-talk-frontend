'use client';

import React, { useState } from 'react';
import { Input, Button, Textarea, Select, SelectItem } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import KakaoMapModal from '../components/KakaoMapModal';

const MateNewPostPage = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 폼 제출 로직 추가...
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
        <Input id="title" placeholder="제목을 입력하세요" />
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
          <SelectItem key="UNDER_BEGINNER" value="UNDER_BEGINNER">
            입문 이하
          </SelectItem>
          <SelectItem key="OVER_LOW" value="OVER_LOW">
            초보 이상
          </SelectItem>
          <SelectItem key="UNDER_LOW" value="UNDER_LOW">
            초보 이하
          </SelectItem>
          <SelectItem key="OVER_MID" value="OVER_MID">
            중수 이상
          </SelectItem>
          <SelectItem key="UNDER_MID" value="UNDER_MID">
            중수 이하
          </SelectItem>
          <SelectItem key="OVER_HIGH" value="OVER_HIGH">
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
        <Button color="primary">작성 완료</Button>
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
