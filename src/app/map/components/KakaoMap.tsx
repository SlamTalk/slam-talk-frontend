/* eslint-disable no-new */

'use client';

import React, { useEffect, useRef, useState } from 'react';
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

interface MouseEventWithLatLng {
  latLng: {
    La: number; // 경도
    Ma: number; // 위도
  };
  point: {
    x: number;
    y: number;
  };
}

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [userLocation, setUserLocation] = useState<any>(null);
  const [mapLevel] = useState(8);
  const [isCourtReportVisible, setIsCourtReportVisible] = useState(false);
  const [selectedCourtId, setSelectedCourtId] = useState<string>('');
  const [isCourtDetailsVisible, setIsCourtDetailsVisible] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [mode, setMode] = useState(false);

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

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API를 불러오는데 실패했습니다.');
      return;
    }

    window.kakao.maps.load(() => {
      if (!('geolocation' in navigator)) {
        alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courts, isLoading, error, map]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (!map) return;

    const handleCreateMarker = (mouseEvent: MouseEventWithLatLng) => {
      const latlng = mouseEvent.latLng;

      const markerImageSrc = '/icons/marker-img.png';
      const imageSize = new window.kakao.maps.Size(48);
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        imageSize
      );

      const newMarker = new window.kakao.maps.Marker({
        position: latlng,
        map,
        image: markerImage,
        clickable: true,
      });

      newMarker.setPosition(latlng);

      const content = `<div class="flex items-center px-2 py-1 bg-white text-black border border-primary rounded text-sm font-medium shadow-sm ml-12">이 곳 제보하기</div>`;

      const overlay = new window.kakao.maps.CustomOverlay({
        map,
        position: latlng,
        content,
        yAnchor: 1,
        xAnchor: 0.5,
      });

      window.kakao.maps.event.addListener(newMarker, 'click', () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          latlng.La,
          latlng.Ma,
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              const courtInfo = {
                address,
                latitude: latlng.La,
                longitude: latlng.Ma,
              };

              setLocation(courtInfo);
              setIsCourtReportVisible(true);
            } else {
              alert('주소를 가져오지 못했습니다.');
            }
          }
        );
      });

      setTimeout(() => {
        newMarker.setMap(null);
        overlay.setMap(null);
      }, 40000);
    };

    if (mode === true) {
      // 이벤트 등록
      window.kakao.maps.event.addListener(map, 'click', handleCreateMarker);
    }

    // 클린업 함수 실행
    // eslint-disable-next-line consistent-return
    return () => {
      window.kakao.maps.event.removeListener(map, 'click', handleCreateMarker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleToggleMapClickEvent = () => {
    setMode((prev) => !prev);
  };

  return (
    <>
      <title>슬램톡 | 농구장 지도</title>
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
            <IoSearchSharp
              size={20}
              className="text-gray-400 hover:text-black"
            />
          </button>
        </div>
        <div
          ref={mapRef}
          className="relative h-[calc(100vh-109px)] w-full overflow-y-hidden"
        >
          {isCourtReportVisible && (
            <CourtReport
              location={location}
              isVisible={isCourtReportVisible}
              onClose={() => setIsCourtReportVisible(false)}
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
            onClick={handleToggleMapClickEvent}
          >
            {mode ? '취소' : '농구장 제보'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default KakaoMap;
