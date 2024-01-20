import React from 'react';
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
import { basketballCourtType, basketballCourtSize } from './courtReportData';

interface CourtReportProps {
  isVisible: boolean;
  onClose: () => void;
}

const CourtReport: React.FC<CourtReportProps> = ({ isVisible, onClose }) => {
  const [value, setValue] = React.useState('');

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
          <Input
            isRequired
            labelPlacement="outside"
            variant="bordered"
            type="string"
            label="농구장명"
            placeholder="농구장명을 입력해주세요."
          />
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
