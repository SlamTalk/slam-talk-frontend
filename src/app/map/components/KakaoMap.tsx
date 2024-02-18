/* eslint-disable no-constant-condition */

'use client';

import React, { useState } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
  CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import userLocationStore from '@/store/userLocationStore';
import { useQuery } from '@tanstack/react-query';
import getCourts from '@/services/basketballCourt/getCourts';
import { Button } from '@nextui-org/button';
import { MdMyLocation } from 'react-icons/md';
import { BiSolidLocationPlus } from 'react-icons/bi';
import { IoSearchSharp } from 'react-icons/io5';
import { BasketballCourts } from '@/types/basketballCourt/basketballCourts';
import CourtDetails from './CourtDetails';

// [TO DO]
// 제보하기 이벤트 구현
// 모달 알림 넣기
// 컨트롤 커스텀
// 공유하기 똑같은 UI 반영
// 농구장 상세정보 UI 수정
// 제보 모달 UI 수정 - 제보하기 Btn Fix

const KakaoMap = () => {
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
  const [isCourtDetailsOpen, setIsCourtDetailsOpen] = useState<boolean>(false);
  const [selectedCourtId, setSelectedCourtId] = useState<number>('');
  const [mode, setMode] = useState(false);
  // const [markers, setMarkers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const { error, data: courts } = useQuery<BasketballCourts[]>({
    queryKey: ['courts'],
    queryFn: getCourts,
  });

  if (error) {
    console.log(error);
  }

  const handleToggleMapClickEvent = () => {
    setMode((prev) => !prev);
  };

  const handleMoveUserLocation = () => {
    if (userLocation) {
      const position = new window.kakao.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      );
      map.panTo(position);
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
    console.log(result);
    return result;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (!map) return;

    if (!searchKeyword) {
      alert('검색어를 입력하세요.');
      return;
    }

    const filteredCourts = filterCourts(courts || [], searchKeyword);
    if (filteredCourts.length > 0) {
      const firstCourt = filteredCourts[0];
      const position = new window.kakao.maps.LatLng(
        firstCourt.latitude,
        firstCourt.longitude
      );
      map.panTo(position);
    } else {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(
        searchKeyword,
        (data: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const firstResult = data[0];
            if (firstResult) {
              const { x, y } = firstResult;
              const position = new window.kakao.maps.LatLng(y, x);
              map.panTo(position);
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

  return (
    <div className="relative h-[calc(100vh-109px)] w-full">
      <title>슬램톡 | 농구장 지도</title>
      <Map
        className="relative z-0"
        id="map"
        center={location.center}
        level={3}
        style={{ width: '100%', height: '100%' }}
        onCreate={setMap}
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
        <div className="mt-20 !bg-primary !text-primary">
          <MapTypeControl position="BOTTOMLEFT" />
          <ZoomControl position="RIGHT" />
        </div>
      </Map>
      {isCourtDetailsOpen && (
        <CourtDetails
          courtId={selectedCourtId}
          onClose={() => setIsCourtDetailsOpen(false)}
        />
      )}
      <div className="absolute bottom-10 right-6 z-10 flex flex-col items-end gap-y-3">
        <Button
          isIconOnly
          aria-label="Current Location"
          type="button"
          className="justify-center rounded-full bg-primary shadow-md"
          onClick={handleMoveUserLocation}
        >
          <MdMyLocation size={22} className="text-white" />
        </Button>
        <Button
          startContent={<BiSolidLocationPlus size={20} />}
          aria-label="Court Report"
          type="button"
          className="justify-center rounded-full bg-primary text-white shadow-md"
          onClick={handleToggleMapClickEvent}
        >
          {mode ? '취소' : '농구장 제보'}
        </Button>
      </div>
    </div>
  );
};

export default KakaoMap;
