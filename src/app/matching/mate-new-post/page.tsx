'use client';

import React, { useState } from 'react';
import { Input, Button, Textarea } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import KakaoMapModal from '../components/KakaoMapModal';

const Page = () => {
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
      <div className="mb-2.5">
        <div className="text-md font-bold">장소</div>
        <div className="relative">
          <Input id="address" placeholder="주소를 입력하세요" value={address} />
          <Button
            className="absolute right-0 top-0 mr-[8px] mt-[8px]"
            onClick={handleOpenMap}
          >
            주소 찾기
          </Button>
        </div>
        <div className="mb-2.5">
          <div className="text-md font-bold">날짜</div>
          <div className="rounded-md bg-gray-100 p-2">
            <DatePicker
              dateFormat="MM월 dd일"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              className="w-full bg-gray-100"
            />
          </div>
        </div>
      </div>
      {/* 시간 선택 필드 */}
      <div className="mb-4">
        <div className="flex justify-between space-x-2">
          <div className="flex-1">
            <div className="text-md mb-2 font-bold">시작 시간</div>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-md bg-gray-100 p-2"
              min="00:00"
              max="23:59"
            />
          </div>
          <div className="flex-1">
            <div className="text-md mb-2 font-bold">종료 시간</div>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-md bg-gray-100 p-2"
              min="00:00"
              max="23:59"
            />
          </div>
        </div>
      </div>
      {/* 포지션 별 인원 수 필드 */}
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">포지션 별 인원 수</div>
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
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="w-full rounded-md bg-gray-100 p-2"
        >
          <option value="">실력대를 선택하세요</option>
          <option value="BEGINNER">입문</option>
          <option value="LOW">초보</option>
          <option value="MID">중수</option>
          <option value="HIGH">고수</option>
        </select>
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

export default Page;
