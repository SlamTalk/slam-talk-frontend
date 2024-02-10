'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';
import { IoSearchSharp } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import { BiSolidLocationPlus } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import getCourts from '@/services/basketballCourt/getCourts';
import CourtReport from './CourtReport';
import CourtDetails from './CourtDetails';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [userLocation, setUserLocation] = useState<any>(null);
  const [, setIsLoading] = useState<boolean>(true);
  const [mapLevel] = useState(8);
  const [isCourtReportVisible, setIsCourtReportVisible] = useState(false);
  const [selectedCourtId, setSelectedCourtId] = useState<string>('');
  const [isCourtDetailsVisible, setIsCourtDetailsVisible] = useState(false);

  const {
    error,
    data: courts,
    isLoading,
  } = useQuery({
    queryKey: ['courts'],
    queryFn: getCourts,
  });

  if (error) {
    console.log('농구장 정보를 불러오는데 실패했습니다:', error);
  }

  console.log(courts);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API를 불러오는데 실패했습니다.');
      return;
    }

    window.kakao.maps.load(() => {
      if (!('geolocation' in navigator)) {
        alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
        setIsLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = new window.kakao.maps.LatLng(latitude, longitude);
          setUserLocation(userLatLng);
          const seoulLatLng = new window.kakao.maps.LatLng(37.50827, 126.99315);
          const options = { center: seoulLatLng, level: mapLevel };
          const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
          setMap(kakaoMap);
          setIsLoading(false);
        },
        (locationError) => {
          console.error(`Error: ${locationError.message}`);
          if (locationError.code === locationError.PERMISSION_DENIED) {
            alert(
              '이 기능을 사용하려면 기기의 위치 서비스를 활성화해야 합니다. 설정에서 위치 서비스를 켜주세요.'
            );
          } else {
            alert('위치 정보를 가져오는데 실패했습니다.');
          }
          setIsLoading(false);
        }
      );
    });
  }, [mapLevel]);

  const moveToLocation = () => {
    if (userLocation && map) {
      map.setLevel(4);
      map.panTo(userLocation);
    } else {
      alert('사용자 위치 정보가 설정되지 않았습니다.');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (!searchKeyword) {
      alert('검색어를 입력하세요.');
      return;
    }

    if (map) {
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

  const displayPlaces = (places: any) => {
    if (!map) return;

    const bounds = new window.kakao.maps.LatLngBounds();
    const markerImageSrc = '/icons/marker-img.png';
    const imageSize = new window.kakao.maps.Size(48);
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      imageSize
    );

    places.forEach((place: any) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        image: markerImage,
      });

      const content = `<div class="flex items-center px-2 py-1 bg-white text-black border border-gray-300 rounded text-sm font-medium shadow-sm ml-12">${place.courtName}</div>`;

      // eslint-disable-next-line no-new
      new window.kakao.maps.CustomOverlay({
        map,
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        content,
        yAnchor: 1,
        xAnchor: 0.5,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedCourtId(place.courtId);
        setIsCourtDetailsVisible(true);
      });

      bounds.extend(
        new window.kakao.maps.LatLng(place.latitude, place.longitude)
      );
    });

    map.setBounds(bounds);
  };

  useEffect(() => {
    if (!map || isLoading || error) return;

    displayPlaces(courts);

    // if (courts) {
    //   courts.forEach((court: any) => {
    //     const marker = new window.kakao.maps.Marker({
    //       map,
    //       position: new window.kakao.maps.LatLng(
    //         court.latitude,
    //         court.longitude
    //       ),
    //     });

    //     window.kakao.maps.event.addListener(marker, 'click', () => {
    //       setSelectedCourtId(court.courtId);
    //       setIsCourtDetailsVisible(true);
    //     });
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courts, isLoading, error, map]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const showCourtReport = () => {
    setIsCourtReportVisible(true);
  };

  const hideCourtReport = () => {
    setIsCourtReportVisible(false);
  };

  return (
    <div className="relative h-full w-full">
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
          <IoSearchSharp size={20} className="text-gray-400 hover:text-black" />
        </button>
      </div>
      <div
        ref={mapRef}
        className="relative h-[calc(100vh-109px)] w-full overflow-y-hidden"
      >
        {isCourtReportVisible && (
          <CourtReport
            isVisible={isCourtReportVisible}
            onClose={hideCourtReport}
          />
        )}
        {isCourtDetailsVisible && (
          <CourtDetails
            courtId={selectedCourtId}
            onClose={() => setIsCourtDetailsVisible(false)}
          />
        )}
      </div>
      <div className="absolute bottom-10 right-6 z-10 flex flex-col items-end gap-y-3">
        <Button
          isIconOnly
          aria-label="Current Location"
          type="button"
          className="justify-center rounded-full bg-primary shadow-md"
          onClick={moveToLocation}
        >
          <MdMyLocation size={22} className="text-white" />
        </Button>
        <Button
          startContent={<BiSolidLocationPlus size={20} />}
          aria-label="Court Report"
          type="button"
          className="justify-center rounded-full bg-primary text-white shadow-md"
          onClick={showCourtReport}
        >
          농구장 제보
        </Button>
      </div>
    </div>
  );
};

export default KakaoMap;
