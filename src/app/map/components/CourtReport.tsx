import React, { useState } from 'react';
import {
  Textarea,
  Input,
  Select,
  RadioGroup,
  Radio,
  SelectItem,
  Button,
} from '@nextui-org/react';
import { IoIosClose } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';
import { basketballCourtType, basketballCourtSize } from '../courtReportData';
import { CameraIcon } from './icons/CameraIcon';

interface CourtReportProps {
  location: { address: string; latitude: string; longitude: string };
  isVisible: boolean;
  onClose: () => void;
}

// 농구장 사진(1MB) ✅
// (마커 정보→ 위도, 경도, 주소) ✅
// 농구장명(필수), 주소(필수), 코트 종류, 실내외(실내/야외), 코트사이즈, 골대수,
// 야간 조명, 개방시간(제한/24시), 사용료, 주차 가능, 기타 정보, 전화번호, 홈페이지(링크)
// 편의시설

const CourtReport: React.FC<CourtReportProps> = ({
  location,
  isVisible,
  onClose,
}) => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const MAX_FILE_SIZE_MB = 1;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.size);
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

  return (
    <div
      className={`absolute inset-0 top-4 z-20 m-auto w-full max-w-md rounded-lg border-1 bg-background
    p-5 text-sm shadow-md transition-all duration-300 ease-in-out md:h-fit 
    md:max-h-[90vh] md:text-lg lg:text-xl ${isVisible ? '' : 'hidden'}`}
    >
      <Button
        isIconOnly
        className="bg-gradient absolute right-4 top-4"
        onClick={onClose}
        aria-label="Close"
      >
        <IoIosClose size={22} />
      </Button>
      <div className="h-full overflow-auto">
        <div className="flex flex-col gap-4">
          <p className="text-center text-lg font-semibold">농구장 제보하기</p>
          <div className="relative flex h-48 w-full items-center justify-center bg-gray-200">
            <div className="absolute top-0 z-20 flex h-8 w-full items-center justify-between bg-yellow-200 px-4 font-semibold">
              <p className="text-sm text-black">
                숨겨진 농구장을 제보해주시면 레벨 점수를 드립니다.
              </p>
              <Button
                color="primary"
                radius="full"
                size="sm"
                className="h-4 w-fit min-w-8 p-0 text-xs"
              >
                30점
              </Button>
            </div>
            <div>
              <Button
                className="z-20 mt-2"
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
                  {file ? '사진 변경' : '사진 추가'}
                </label>
              </Button>
            </div>
            <input
              id="fileInput"
              name="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
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
          <Input
            isRequired
            labelPlacement="outside"
            variant="bordered"
            type="string"
            label="농구장명"
            placeholder="농구장명을 입력해주세요."
          />
          <div>
            <p className="text-md font-semibold">주소</p>
            <p>{location.address}</p>
            <p>{location.latitude}</p>
            <p>{location.longitude}</p>
          </div>
          <div className="flex gap-4 md:flex-nowrap">
            <Select
              labelPlacement="outside"
              label="코트 종류"
              placeholder="코트 종류"
              variant="bordered"
              className="max-w-xs"
            >
              {basketballCourtType.map((courtType) => (
                <SelectItem key={courtType.value} value={courtType.value}>
                  {courtType.value}
                </SelectItem>
              ))}
            </Select>
            <Select
              labelPlacement="outside"
              label="코트 사이즈"
              placeholder="코트 사이즈"
              variant="bordered"
              className="max-w-xs"
            >
              {basketballCourtSize.map((courtSize) => (
                <SelectItem key={courtSize.value} value={courtSize.value}>
                  {courtSize.value}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Input
            labelPlacement="outside"
            variant="bordered"
            type="number"
            label="골대 수"
            placeholder="골대 수"
          />
          <RadioGroup label="야간 조명" orientation="horizontal">
            <Radio value="있음">있음</Radio>
            <Radio value="없음">없음</Radio>
          </RadioGroup>
          <RadioGroup label="개방 시간" orientation="horizontal">
            <Radio value="제한">제한</Radio>
            <Radio value="24시">24시</Radio>
          </RadioGroup>
          <RadioGroup label="사용료" orientation="horizontal">
            <Radio value="무료">무료</Radio>
            <Radio value="유료">유료</Radio>
          </RadioGroup>
          <RadioGroup label="주차여부" orientation="horizontal">
            <Radio value="가능">가능</Radio>
            <Radio value="불가능">불가능</Radio>
          </RadioGroup>
          <div className="w-full">
            <Textarea
              maxRows={3}
              variant="bordered"
              label="기타 정보"
              placeholder="해당 농구장에 관한 기타 정보를 입력해주세요."
              value={value}
              onValueChange={setValue}
            />
          </div>
          <Button
            aria-label="제보하기"
            type="button"
            className="bg-primary text-white"
          >
            제보하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourtReport;
