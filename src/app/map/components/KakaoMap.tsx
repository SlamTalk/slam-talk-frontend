/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable no-useless-escape */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
  CustomOverlayMap,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import userLocationStore from '@/store/userLocationStore';
import { useQuery } from '@tanstack/react-query';
import getCourts from '@/services/basketballCourt/getCourts';
import { Button } from '@nextui-org/button';
import { MdMyLocation } from 'react-icons/md';
import { BiSolidLocationPlus } from 'react-icons/bi';
import { IoSearchSharp } from 'react-icons/io5';
import { BasketballCourts } from '@/types/basketballCourt/basketballCourts';
import { getAddressFromCoords } from '@/utils/getUserLocation';
import LocalStorage from '@/utils/localstorage';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react';
import getReportCourts from '@/services/basketballCourt/getReportCourts';
import CourtDetails from './CourtDetails';
import CourtReport from './CourtReport';
import CourtReportDetails from './CourtReportDetails';

export interface LatLng {
  getLat: () => number;
  getLng: () => number;
}

export interface MouseEventWithLatLng {
  latLng: LatLng;
}

const KakaoMap = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [map, setMap] = useState<any>();
  const userLocation = userLocationStore((state) => state.userLocation);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState({
    center: {
      // 지도의 초기 위치
      lat: userLocation ? userLocation.latitude : 37.5737,
      lng: userLocation ? userLocation.longitude : 127.0484,
    },
  });
  const [isCourtReportOpen, setIsCourtReportOpen] = useState(false);
  const [isCourtDetailsOpen, setIsCourtDetailsOpen] = useState<boolean>(false);
  const [isCourtReportDetailsOpen, setIsCourtReportDetailsOpen] =
    useState(false);
  const [selectedCourtId, setSelectedCourtId] = useState<number>(1);
  const [selectedCourtReportId, setSelectedCourtReportId] = useState<number>(1);
  const [mode, setMode] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [coord, setCoord] = useState('');
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [clickPositionAddress, setClickPositionAddress] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');

  const { error, data: courts } = useQuery<BasketballCourts[]>({
    queryKey: ['courts'],
    queryFn: getCourts,
  });

  const { data: reportCourts, refetch } = useQuery<BasketballCourts[]>({
    queryKey: ['reportCourts'],
    queryFn: getReportCourts,
  });

  if (error) {
    console.log(error);
  }

  const handleToggleMapClickEvent = () => {
    if (isLoggedIn === 'true') {
      setMode((prev) => !prev);
    } else {
      onOpen();
    }

    if (mode === false) {
      setPosition(null);
    }
  };

  const handleMoveUserLocation = () => {
    if (userLocation) {
      const userPosition = new window.kakao.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      );
      map.panTo(userPosition);
    } else {
      alert('위치 정보가 설정되지 않았습니다.');
    }
  };

  const filterCourts = (
    basketballCourts: BasketballCourts[],
    keyword: string
  ) => {
    const result = basketballCourts.filter(
      (court) =>
        court.courtName.includes(keyword) || court.address.includes(keyword)
    );
    return result;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (!map) return;

    const filteredCourts = filterCourts(courts || [], searchKeyword);
    if (filteredCourts.length > 0) {
      const firstCourt = filteredCourts[0];
      const courtPosition = new window.kakao.maps.LatLng(
        firstCourt.latitude,
        firstCourt.longitude
      );
      map.panTo(courtPosition);
    } else {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(
        searchKeyword,
        (data: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const firstResult = data[0];
            if (firstResult) {
              const { x, y } = firstResult;
              const kakaoPosition = new window.kakao.maps.LatLng(y, x);
              map.panTo(kakaoPosition);
            }
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
          }
        },
        { location: map.getCenter() }
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchAddressQueryParams = () => {
    const address = searchParams.get('address');
    if (address) {
      setSearchKeyword(address);
      handleSearch();
      router.replace('/map');
    }
  };

  useEffect(() => {
    searchAddressQueryParams();
  }, [searchAddressQueryParams]);

  const handleClickReport = (
    _: kakao.maps.Map,
    mouseEvent: MouseEventWithLatLng
  ) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();
    setCoord(
      `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
    );
    console.log(coord);
    if (mode === true) {
      setPosition({
        lat,
        lng,
      });
      getAddressFromCoords(lat, lng)
        .then(({ address, roadAddress }) => {
          // 도로명 주소가 있으면 그 값을, 없으면 지번 주소를 사용
          const finalAddress = roadAddress || address;
          setClickPositionAddress(finalAddress);
        })
        .catch((error) => {
          console.error('주소 정보를 가져오는데 실패했습니다.', error);
        });
    }
  };

  const handleClickReportMarker = () => {
    setIsCourtReportOpen(true);
  };

  return (
    <>
      <div className="relative h-[calc(100vh-109px)] w-full max-w-[600px]">
        <title>슬램톡 | 농구장 지도</title>
        <Map
          className="relative h-full w-full"
          id="map"
          center={location.center}
          level={3}
          onCreate={setMap}
          onClick={handleClickReport}
        >
          <div className="absolute left-1/2 top-4 z-10 flex w-4/5 max-w-lg -translate-x-1/2 transform items-center justify-center rounded-md bg-background p-1 shadow-md">
            <input
              type="text"
              placeholder="장소 검색"
              className="flex-grow rounded-md border-0 p-2 focus:outline-none focus:ring-0"
              value={searchKeyword}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button
              aria-label="Search"
              type="button"
              onClick={handleSearch}
              className="ml-2 mr-2 flex h-full items-center justify-center rounded-md focus:outline-none"
            >
              <IoSearchSharp
                size={20}
                className="text-gray-400 hover:text-black"
              />
            </button>
          </div>
          {mode && position && (
            <>
              <MapMarker
                image={{
                  src: '/icons/marker-img.png',
                  size: {
                    width: 41,
                    height: 48,
                  },
                }}
                position={position}
                clickable
                onClick={handleClickReportMarker}
              />
              <CustomOverlayMap
                key={`overlay__${position.lat}-${position.lng}`}
                position={position}
                yAnchor={2.6}
                xAnchor={0.67}
              >
                <div className="ml-12 flex items-center rounded border-1 border-primary bg-white px-2 py-1 text-sm font-medium text-black shadow-sm">
                  이 곳 제보하기
                </div>
              </CustomOverlayMap>
            </>
          )}
          {reportCourts?.map((court) => (
            <>
              <MapMarker
                key={court.courtId}
                position={{ lat: court.latitude, lng: court.longitude }}
                image={{
                  src: '/icons/marker-img.png',
                  size: {
                    width: 41,
                    height: 48,
                  },
                }}
                clickable
                onClick={() => {
                  setIsCourtReportDetailsOpen(true);
                  setSelectedCourtReportId(court.courtId);
                }}
              />
              <CustomOverlayMap
                key={`overlay__${court.latitude}-${court.longitude}`}
                position={{ lat: court.latitude, lng: court.longitude }}
                yAnchor={2.6}
                xAnchor={0.66}
              >
                <Tooltip content={court.courtName} showArrow placement="right">
                  <div className="ml-12 flex items-center rounded border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-black shadow-sm">
                    #{court.courtId} 제보 검토중
                  </div>
                </Tooltip>
              </CustomOverlayMap>
            </>
          ))}
          <MarkerClusterer
            averageCenter // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={8} // 클러스터 할 최소 지도 레벨
          >
            {courts?.map((court) => (
              <>
                <MapMarker
                  key={court.courtId}
                  position={{ lat: court.latitude, lng: court.longitude }}
                  image={{
                    src: '/icons/marker-img.png',
                    size: {
                      width: 41,
                      height: 48,
                    },
                  }}
                  clickable
                  onClick={() => {
                    setIsCourtDetailsOpen(true);
                    setSelectedCourtId(court.courtId);
                  }}
                />
                <CustomOverlayMap
                  key={`overlay__${court.latitude}-${court.longitude}`}
                  position={{ lat: court.latitude, lng: court.longitude }}
                  yAnchor={2.6}
                  xAnchor={0.63}
                >
                  <div className="ml-12 flex items-center rounded border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-black shadow-sm">
                    {court.courtName}
                  </div>
                </CustomOverlayMap>
              </>
            ))}
          </MarkerClusterer>
          <MapTypeControl position="BOTTOMLEFT" />
          <ZoomControl position="RIGHT" />
        </Map>
        {isCourtDetailsOpen && (
          <CourtDetails
            courtId={selectedCourtId}
            handleClose={() => setIsCourtDetailsOpen(false)}
          />
        )}
        {isCourtReportDetailsOpen && (
          <CourtReportDetails
            courtId={selectedCourtReportId}
            onClose={() => setIsCourtReportDetailsOpen(false)}
          />
        )}
        {position && clickPositionAddress && isCourtReportOpen && (
          <CourtReport
            address={clickPositionAddress}
            position={position}
            handleClose={() => {
              setIsCourtReportOpen(false);
              setPosition(null);
              refetch();
            }}
            onReportSuccess={() => setMode(false)}
          />
        )}
        <div className="relative z-10 w-full max-w-[600px]">
          <div className="ml-10 mr-4 flex flex-col items-end gap-3">
            <Button
              isIconOnly
              aria-label="Current Location"
              type="button"
              className="fixed bottom-28 justify-center rounded-full bg-primary shadow-md"
              onClick={handleMoveUserLocation}
            >
              <MdMyLocation size={22} className="text-white" />
            </Button>
            <Button
              startContent={<BiSolidLocationPlus size={20} />}
              aria-label="Court Report"
              type="button"
              className="fixed bottom-16 justify-center rounded-full bg-primary text-white shadow-md"
              onClick={handleToggleMapClickEvent}
            >
              {mode ? '취소' : '농구장 제보'}
            </Button>
          </div>
        </div>
      </div>
      <Modal size="sm" isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                농구장 제보
              </ModalHeader>
              <ModalBody>
                <p>로그인한 사용자만 이용할 수 있는 서비스입니다.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button color="primary" onPress={() => router.push('/login')}>
                  로그인하러 가기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default KakaoMap;
