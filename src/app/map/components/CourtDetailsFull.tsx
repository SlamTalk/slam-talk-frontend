'use client';

import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { FaPhoneAlt, FaParking, FaTag, FaRegDotCircle } from 'react-icons/fa';
import Image from 'next/image';
import { FaLocationDot, FaClock, FaLightbulb } from 'react-icons/fa6';
import { PiChatsCircle } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getCourtDetails from '@/services/basketballCourt/getCourtDetails';
import Link from 'next/link';
import LocalStorage from '@/utils/localstorage';
import { CourtIcon } from './icons/CourtIcon';
import { HoopIcon } from './icons/HoopIcon';
import { FeeIcon } from './icons/FeeIcon';
import { InfoIcon } from './icons/InfoIcon';
import { WebsiteIcon } from './icons/WebsiteIcon';

interface CourtDetailsProps {
  courtId: number;
}

const CourtDetailsFull: React.FC<CourtDetailsProps> = ({ courtId }) => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const [loginMsg, setLoginMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [isTel, setIsTel] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { error, data: selectedPlace } = useQuery({
    queryKey: ['courtDetails', courtId],
    queryFn: () => getCourtDetails(courtId),
  });

  if (error) {
    console.log(error);
    router.push('/map');
  }

  if (selectedPlace) {
    const handlePhoneClick = () => {
      if (selectedPlace.phoneNum) {
        setAlertMsg(
          `이 전화번호로 연결하시겠습니까? ${selectedPlace.phoneNum}`
        );
        setIsTel(true);
        onOpen();
      }
    };

    const handleCopyAddress = async () => {
      if (selectedPlace.address) {
        try {
          await navigator.clipboard.writeText(selectedPlace.address);
          setAlertMsg('주소가 복사되었습니다.');
          onOpen();
        } catch (copyError) {
          console.error('주소 복사 중 오류 발생:', copyError);
          setAlertMsg('주소를 복사하는 데 실패했습니다.');
          onOpen();
        }
      }
    };

    const handleGoChatting = () => {
      if (isLoggedIn === 'true') {
        router.push(`/chatting/chatroom/${selectedPlace.chatroomId}`);
      } else {
        setLoginMsg('로그인 후 이용할 수 있는 서비스입니다.');
        onOpen();
      }
    };

    const handleCloseAlert = () => {
      setAlertMsg('');
      onClose();
    };

    const handleCloseLoginModal = () => {
      setLoginMsg('');
      onClose();
    };

    return (
      <>
        <title>슬램톡 | 농구장 지도</title>
        <div className="h-full w-full overflow-y-auto">
          <div className="relative w-full text-sm">
            <div className="relative h-64 w-full sm:h-48">
              <Image
                fill
                alt="농구장 사진"
                src={
                  selectedPlace.photoUrl
                    ? selectedPlace.photoUrl
                    : '/images/basketball-court.svg'
                }
              />
            </div>
            <div className="mb-5 h-full p-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">{selectedPlace.courtName}</h2>
                <div>
                  <Button
                    color="primary"
                    radius="full"
                    size="md"
                    startContent={<PiChatsCircle />}
                    aria-label="시설 채팅 바로가기"
                    onClick={handleGoChatting}
                  >
                    시설 채팅
                  </Button>
                </div>
              </div>
              <span className="break-keep rounded-sm bg-gray-100 px-1 text-gray-500 dark:bg-gray-300 dark:text-gray-600">
                {selectedPlace.indoorOutdoor}
              </span>
              <div className="my-4 w-full">
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
                <div className="flex items-center gap-2 align-middle">
                  <FaLocationDot
                    size={16}
                    className="dark:text-gray-20 text-gray-400"
                  />
                  <span>{selectedPlace.address}</span>
                  <button type="button" onClick={handleCopyAddress}>
                    <span className="text-blue-500">복사</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FaClock
                    size={14}
                    className="text-gray-400 dark:text-gray-200"
                  />
                  <span>
                    개방 시간:{' '}
                    <span className="text-rose-400">
                      {selectedPlace.openingHours}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FaPhoneAlt
                    size={15}
                    className="pointer-events-auto text-gray-400 dark:text-gray-200"
                    onClick={handlePhoneClick}
                  />
                  <span>
                    {selectedPlace.phoneNum ? selectedPlace.phoneNum : '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FeeIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="text-info text-blue-500">
                    이용료: {selectedPlace.fee}
                  </span>
                </div>

                <div className="flex items-center gap-2 align-middle">
                  <WebsiteIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="text-blue-500">
                    {selectedPlace.website ? (
                      <Link href={selectedPlace.website} target="_blank">
                        {selectedPlace.website}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <CourtIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="font-medium">
                    코트 종류: {selectedPlace.courtType}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <CourtIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="font-medium">
                    코트 사이즈: {selectedPlace.courtSize}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <HoopIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="font-medium">
                    골대 수: {selectedPlace.hoopCount}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FaLightbulb
                    size={17}
                    className="text-gray-400 dark:text-gray-200"
                  />
                  <span>야간 조명: {selectedPlace.nightLighting}</span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FaParking
                    size={17}
                    className="text-gray-400 dark:text-gray-200"
                  />
                  <span>주차: {selectedPlace.parkingAvailable}</span>
                </div>

                <div className="flex items-center gap-2 align-middle text-sm">
                  <FaTag
                    size={17}
                    className="text-gray-400 dark:text-gray-200"
                  />
                  <ul className="flex gap-2">
                    {selectedPlace.convenience &&
                      selectedPlace.convenience
                        .filter((item) => item !== '')
                        .map((tag: string, idx: number) =>
                          tag !== '' ? (
                            <li
                              // eslint-disable-next-line react/no-array-index-key
                              key={idx}
                              className="rounded-sm bg-gray-100 px-1 text-gray-500 dark:bg-gray-300 dark:text-gray-600"
                            >
                              <span>{tag}</span>
                            </li>
                          ) : (
                            '-'
                          )
                        )}
                  </ul>
                </div>
                <div className="flex items-center gap-2 align-middle">
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
        {loginMsg && (
          <Modal
            size="sm"
            isOpen={isOpen}
            onClose={handleCloseLoginModal}
            placement="center"
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    농구장 시설 채팅
                  </ModalHeader>
                  <ModalBody>
                    <p>{loginMsg}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleCloseLoginModal}
                    >
                      닫기
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => router.push('/login')}
                    >
                      로그인하러 가기
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
        {alertMsg && (
          <Modal
            size="sm"
            isOpen={isOpen}
            onClose={handleCloseAlert}
            placement="center"
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    알림
                  </ModalHeader>
                  <ModalBody>
                    <p>{alertMsg}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={handleCloseAlert}>
                      확인
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
        {isTel && (
          <Modal
            size="sm"
            isOpen={isOpen}
            onClose={handleCloseAlert}
            placement="center"
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    전화 연결
                  </ModalHeader>
                  <ModalBody>
                    <p>{alertMsg}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleCloseLoginModal}
                    >
                      취소
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        window.location.href = `tel:${selectedPlace.phoneNum}`;
                      }}
                    >
                      확인
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }
  return null;
};

export default CourtDetailsFull;
