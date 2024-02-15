'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Textarea, Select, SelectItem } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/api/axiosInstance';
import { AxiosResponse } from 'axios';
import { NewTeamData, TeamPost } from '@/types/matching/teamDataType';
import { useParams, useRouter } from 'next/navigation';
import KakaoMapModal from '@/app/matching/components/KakaoMapModal';

const TeamPostRevisePage = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { postId } = useParams();
  const router = useRouter();

  const fetchTeamDetailsData = async (): Promise<TeamPost> => {
    const response = await axiosInstance
      .get(`/api/match/read/${postId}`)
      .then((res) => res.data.results);

    return response;
  };

  const { data } = useQuery<TeamPost, Error>({
    queryKey: ['team', postId],
    queryFn: fetchTeamDetailsData,
  });

  const [title, setTitle] = useState('');
  const [teamName, setTeamName] = useState('');
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [gameSize, setGameSize] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setTeamName(data.teamName);
      setAddress(data.locationDetail);
      setStartDate(new Date(data.scheduledDate));
      setStartTime(data.startTime);
      setEndTime(data.endTime);
      setGameSize(data.numberOfMembers);
      setSkillLevel(data.skillLevel);
      setDetails(data.content);
    }
  }, [data]);

  const patchTeamPost = async (
    newTeamData: NewTeamData
  ): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.patch<AxiosResponse>(
        `/api/match/${postId}`,
        newTeamData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const patchPostMutation = useMutation<AxiosResponse, Error, NewTeamData>({
    mutationFn: patchTeamPost,
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

    patchPostMutation.mutate(newTeamData);
    router.push(`/matching/team-details/${postId}`);
  };

  return (
    <form className="relative p-4" onSubmit={handleSubmit}>
      {/* 제목 필드 */}
      <div className="mb-4">
        <div className="text-md font-bold">제목</div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>
      {/* 팀명 필드 */}
      <div className="mb-4">
        <div className="text-md mb-2 font-bold">팀명</div>
        <Input
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
          defaultSelectedKeys={data?.numberOfMembers}
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
          defaultSelectedKeys={data?.skillLevel}
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="w-full"
          placeholder="실력대를 선택하세요"
        >
          <SelectItem key="OVER_BEGINNER" value="OVER_BEGINNER">
            입문 이상
          </SelectItem>
          <SelectItem key="BEGINNER" value="BEGINNER">
            입문
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
            고수
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
          수정 완료
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
export default TeamPostRevisePage;
