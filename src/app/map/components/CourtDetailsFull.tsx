'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { FaPhoneAlt, FaParking, FaTag, FaRegDotCircle } from 'react-icons/fa';
import Image from 'next/image';
import { FaLocationDot, FaClock, FaLightbulb } from 'react-icons/fa6';
import { PiChatsCircle } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getCourtDetails from '@/services/basketballCourt/getCourtDetails';
import { RiShareBoxFill } from 'react-icons/ri';
import Link from 'next/link';
import { CourtIcon } from './icons/CourtIcon';
import { HoopIcon } from './icons/HoopIcon';
import { FeeIcon } from './icons/FeeIcon';
import { InfoIcon } from './icons/InfoIcon';
import { WebsiteIcon } from './icons/WebsiteIcon';

interface CourtDetailsProps {
  courtId: string;
}

const CourtDetailsFull: React.FC<CourtDetailsProps> = ({ courtId }) => {
  const router = useRouter();

  console.log(courtId);

  const { error, data: selectedPlace } = useQuery({
    queryKey: ['courtDetails', courtId],
    queryFn: () => getCourtDetails(courtId as string),
    enabled: !!courtId,
  });

  if (error) {
    console.log(error);
    router.push('/map');
  }

  if (selectedPlace) {
    const handlePhoneClick = () => {
      if (selectedPlace.phoneNum) {
        const confirmDial = window.confirm(
          `이 전화번호로 연결하시겠습니까? ${selectedPlace.phoneNum}`
        );
        if (confirmDial) {
          window.location.href = `tel:${selectedPlace.phoneNum}`;
        }
      }
    };

    const handleCopyAddress = async () => {
      if (selectedPlace.address) {
        try {
          await navigator.clipboard.writeText(selectedPlace.address);
          alert('주소가 복사되었습니다.');
        } catch (copyError) {
          console.error('주소 복사 중 오류 발생:', error);
          alert('주소를 복사하는 데 실패했습니다.');
        }
      }
    };
    selectedPlace.convenience = ['화장실', '휴게시설'];

    return (
      <div className="h-full w-full overflow-y-scroll">
        <div className="relative w-full text-sm">
          <div className="relative h-60 w-full sm:h-48">
            {selectedPlace.photoUrl ? (
              <Image
                layout="fill"
                alt="농구장 사진"
                src={selectedPlace.photoUrl}
              />
            ) : (
              <Image
                layout="fill"
                alt="농구장 사진"
                src="/images/han-river-park-court.png"
              />
            )}
          </div>
          <div className="mb-5 h-full p-4">
            <div className="flex justify-between">
              <h2 className="mx-1 text-xl font-bold">
                {selectedPlace.courtName}
              </h2>
              <Button
                color="primary"
                variant="ghost"
                className="border-1 font-semibold"
                radius="full"
                size="md"
                startContent={<PiChatsCircle />}
                aria-label="시설 채팅 바로가기"
              >
                시설 채팅
              </Button>
            </div>
            <div className="my-4 flex w-full items-center justify-start gap-3">
              <Button
                size="sm"
                aria-label="크게 보기"
                variant="bordered"
                className="border-0 p-0"
                radius="full"
                startContent={<RiShareBoxFill />}
                onClick={() => window.open(`/map/${courtId}`)}
              >
                크게 보기
              </Button>
              <hr className="h-4 w-px bg-gray-300" />
              <Button
                size="sm"
                variant="bordered"
                startContent={<FaRegDotCircle />}
                radius="full"
                className="border-0 p-0"
                onClick={() => {
                  window.open(
                    `https://map.kakao.com/link/to/${selectedPlace.courtName},${selectedPlace.latitude},${selectedPlace.longitude}`,
                    '_blank'
                  );
                }}
              >
                길찾기
              </Button>
            </div>
            <hr className="w-90 my-4 h-px bg-gray-300" />
            <div className="my-4 flex flex-col gap-4">
              <div className="flex gap-2 align-middle">
                <FaLocationDot
                  size={16}
                  className="dark:text-gray-20 text-gray-400"
                />
                <span>{selectedPlace.address}</span>
                <button type="button" onClick={handleCopyAddress}>
                  <span className="text-blue-500">복사</span>
                </button>
              </div>
              <div className="flex gap-2 align-middle">
                <FaClock
                  size={14}
                  className="text-gray-400 dark:text-gray-200"
                />
                <span>
                  개방 시간:{' '}
                  <span className="text-rose-400">
                    {selectedPlace.openingHours === true ? '24시간' : '제한'}
                  </span>
                </span>
              </div>
              <div className="flex gap-2 align-middle">
                <FaPhoneAlt
                  size={15}
                  className="pointer-events-auto text-gray-400 dark:text-gray-200"
                  onClick={handlePhoneClick}
                />
                <span>
                  {selectedPlace.phoneNum ? selectedPlace.phoneNum : '-'}
                </span>
              </div>
              <div className="flex gap-2 align-middle">
                <FeeIcon className="text-gray-400 dark:text-gray-200" />
                <span className="text-info text-blue-500">
                  이용료: {selectedPlace.fee === true ? '유료' : '무료'}
                </span>
              </div>

              <div className="flex gap-2 align-middle">
                <WebsiteIcon className="text-gray-400 dark:text-gray-200" />
                {selectedPlace.website ? (
                  <Link href={selectedPlace.website} target="_blank">
                    {selectedPlace.website}
                  </Link>
                ) : (
                  '-'
                )}
              </div>
              <div className="flex gap-2 align-middle">
                <CourtIcon className="text-gray-400 dark:text-gray-200" />
                <span className="font-medium">
                  코트 종류: {selectedPlace.courtType}
                </span>
              </div>
              <div className="flex gap-2 align-middle">
                <CourtIcon className="text-gray-400 dark:text-gray-200" />
                <span className="font-medium">
                  코트 사이즈: {selectedPlace.courtSize}
                </span>
              </div>
              <div className="flex gap-2 align-middle">
                <HoopIcon className="text-gray-400 dark:text-gray-200" />
                <span className="font-medium">
                  골대 수: {selectedPlace.hoopCount}
                </span>
              </div>
              <div className="flex gap-2 align-middle">
                <FaLightbulb
                  size={17}
                  className="text-gray-400 dark:text-gray-200"
                />
                <span>
                  야간 조명:{' '}
                  {selectedPlace.nightLighting === true ? '있음' : '없음'}
                </span>
              </div>
              <div className="flex gap-2 align-middle">
                <FaParking
                  size={17}
                  className="text-gray-400 dark:text-gray-200"
                />
                <span>
                  주차:{' '}
                  {selectedPlace.parkingAvailable === true ? '가능' : '불가'}
                </span>
              </div>

              <div className="flex gap-2 align-middle text-sm">
                <FaTag size={17} className="text-gray-400 dark:text-gray-200" />
                <span className="rounded-sm bg-gray-100 px-1 text-gray-500 dark:bg-gray-300 dark:text-gray-600">
                  {selectedPlace.indoorOutdoor}
                </span>
                <ul className="flex gap-2">
                  {selectedPlace.convenience
                    ? selectedPlace.convenience.map(
                        (tag: string, idx: number) => (
                          <li
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            className="rounded-sm bg-gray-100 px-1 text-gray-500 dark:bg-gray-300 dark:text-gray-600"
                          >
                            <span>{tag}</span>
                          </li>
                        )
                      )
                    : '-'}
                </ul>
              </div>
              <div className="flex gap-2 align-middle">
                <InfoIcon className="text-gray-400 dark:text-gray-200" />
                <span className="text-sm">
                  {selectedPlace.additionalInfo
                    ? selectedPlace.additionalInfo
                    : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default CourtDetailsFull;
