import React from 'react';
import { Textarea, Input, RadioGroup, Radio, Button } from '@nextui-org/react';
import { IoIosClose } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa';
import { PiChatsCircle } from 'react-icons/pi';
import Image from 'next/image';

interface CourtDetailsProps {
  isVisible: boolean;
  onClose: () => void;
  selectedPlace: any;
}

const CourtDetails: React.FC<CourtDetailsProps> = ({
  isVisible,
  onClose,
  selectedPlace,
}) => (
  <div
    className={`absolute inset-0 z-40 m-auto h-fit w-full max-w-md rounded-lg border-1 bg-background
  shadow-md transition-all duration-300  ease-in-out ${isVisible ? '' : 'hidden'}`}
  >
    <div className="relative max-h-[85vh] w-full overflow-auto">
      <div className="relative h-28 w-full">
        <Image
          layout="fill"
          objectFit="contain"
          alt="농구장 사진"
          src="/images/court.svg"
        />
        <Button
          isIconOnly
          className="bg-gradient absolute right-2 top-2"
          onClick={onClose}
          aria-label="Close"
        >
          <IoIosClose size={22} />
        </Button>
      </div>
      <div className="mb-5 px-8">
        <div className="my-4 flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {selectedPlace.place_name}
            </h2>
            <p>{selectedPlace.address_name}</p>
          </div>
          <div className="flex gap-3">
            <FaPhone size={20} />
            <PiChatsCircle size={22} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 md:flex-nowrap">
            <Input
              type="text"
              isReadOnly
              labelPlacement="outside"
              label="코트 종류"
              defaultValue="우레탄"
              variant="bordered"
              className="text-b max-w-xs"
            />
            <Input
              type="text"
              isReadOnly
              labelPlacement="outside"
              label="코트 사이즈"
              defaultValue="풀코트"
              variant="bordered"
              className="max-w-xs"
            />
          </div>

          <Input
            isReadOnly
            labelPlacement="outside"
            variant="bordered"
            type="number"
            label="골대 수"
            defaultValue="4"
          />
          <RadioGroup
            isReadOnly
            defaultValue="있음"
            label="야간 조명"
            orientation="horizontal"
          >
            <Radio value="있음">있음</Radio>
            <Radio value="없음">없음</Radio>
          </RadioGroup>
          <RadioGroup
            isReadOnly
            defaultValue="24시"
            label="개방 시간"
            orientation="horizontal"
          >
            <Radio value="제한">제한</Radio>
            <Radio value="24시">24시</Radio>
          </RadioGroup>
          <RadioGroup
            isReadOnly
            defaultValue="무료"
            label="사용료"
            orientation="horizontal"
          >
            <Radio value="무료">무료</Radio>
            <Radio value="유료">유료</Radio>
          </RadioGroup>
          <RadioGroup
            isReadOnly
            defaultValue="불가능"
            label="주차여부"
            orientation="horizontal"
          >
            <Radio value="가능">가능</Radio>
            <Radio value="불가능">불가능</Radio>
          </RadioGroup>
          <div className="w-full">
            <Textarea
              isReadOnly
              variant="bordered"
              label="기타 정보"
              defaultValue="주차하기 어려워요. 대중교통 이용 추천해요."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourtDetails;
