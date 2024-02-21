'use client';

import React, { useState } from 'react';
import { Input, Button, Textarea, Select, SelectItem } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/app/api/axiosInstance';
import { AxiosResponse } from 'axios';
import { NewTeamData } from '@/types/matching/teamDataType';
import { useRouter } from 'next/navigation';
import KakaoMapModal from '../components/KakaoMapModal';

const TeamNewPostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [teamName, setTeamName] = useState('');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [gameSize, setGameSize] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState('');
  const [details, setDetails] = useState('');

  const createTeamPost = async (
    newTeamData: NewTeamData
  ): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.post<AxiosResponse>(
        '/api/match/register',
        newTeamData
      );
      console.log({ response });
      router.push('/matching');
      return response.data;
    } catch (error) {
      alert('장소와 날짜, 시간을 다시 한 번 확인해주세요.');
      console.log(error);
      throw error;
    }
  };

  const createPostMutation = useMutation<AxiosResponse, Error, NewTeamData>({
    mutationFn: createTeamPost,
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

  const handleGameSizeChange = (value: string) => {
    setGameSize(value);
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = startDate ? formatDate(startDate) : '';

    const newTeamData: NewTeamData = {
      teamName,
      title,
      scheduledDate: formattedDate,
      startTime,
      endTime,
      locationDetail: address,
      numberOfMembers: gameSize,
      skillLevel,
      content: details,
    };

    createPostMutation.mutate(newTeamData);
  };

  return (
    <form className="relative p-4" onSubmit={handleSubmit}>
      {/* 제목 필드 */}
      <div className="mb-4">
        <div className="text-md font-bold">제목</div>
        <Input
          isRequired
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>
      {/* 팀명 필드 */}
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">팀명</div>
        <Input
          isRequired
          maxLength={30}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="팀명을 입력하세요"
          height={20}
        />
      </div>

      {/* 주소 선택 필드 */}
      <div className="mb-2.5">
        <div className="text-md font-bold">장소</div>
        <div className="relative">
          <Input
            isRequired
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
        <div className="rounded-medium bg-gray-100 p-2 dark:bg-default-100">
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
      {/* 경기 규모 선택 필드 */}
      <div className="mb-2.5">
        <div className="text-md font-bold">규모</div>
        <Select
          isRequired
          value={gameSize}
          onChange={(e) => handleGameSizeChange(e.target.value)}
          className="w-full"
          placeholder="규모를 선택하세요"
        >
          <SelectItem key="2" value="2">
            2vs2
          </SelectItem>
          <SelectItem key="3" value="3">
            3vs3
          </SelectItem>
          <SelectItem key="4" value="4">
            4vs4
          </SelectItem>
          <SelectItem key="5" value="5">
            5vs5
          </SelectItem>
        </Select>
      </div>

      {/* 원하는 실력대 필드 */}
      <div className="mb-2.5">
        <div className="text-md font-bold">원하는 실력대</div>
        <Select
          isRequired
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="w-full"
          placeholder="실력대를 선택하세요"
        >
          <SelectItem key="BEGINNER" value="BEGINNER">
            입문
          </SelectItem>
          <SelectItem key="OVER_BEGINNER" value="OVER_BEGINNER">
            입문 이상
          </SelectItem>
          <SelectItem key="UNDER_LOW" value="UNDER_LOW">
            하수 이하
          </SelectItem>
          <SelectItem key="OVER_LOW" value="OVER_LOW">
            하수 이상
          </SelectItem>
          <SelectItem key="UNDER_MIDDLE" value="UNDER_MIDDLE">
            중수 이하
          </SelectItem>
          <SelectItem key="OVER_MIDDLE" value="OVER_MIDDLE">
            중수 이상
          </SelectItem>
          <SelectItem key="UNDER_HIGH" value="UNDER_HIGH">
            고수 이하
          </SelectItem>
          <SelectItem key="HIGH" value="HIGH">
            고수
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

export default TeamNewPostPage;
