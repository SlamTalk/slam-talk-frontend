'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';
import { IoSearchSharp } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import { BiSolidLocationPlus } from 'react-icons/bi';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [userLocation, setUserLocation] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [, setIsLoading] = useState<boolean>(true);
  const [mapLevel] = useState(3); // 초기 확대 레벨 설정

  useEffect(() => {
    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const userLatLng = new window.kakao.maps.LatLng(
                latitude,
                longitude
              );
              setUserLocation(userLatLng);
              const options = { center: userLatLng, level: 3 };
              const kakaoMap = new window.kakao.maps.Map(
                mapRef.current,
                options
              );
              setMap(kakaoMap);
              setIsLoading(false);
            },
            () => {
              // 사용자 위치를 가져오는데 실패했을 때 처리
              alert('위치 정보를 가져오는데 실패했습니다.');
              setIsLoading(false);
            }
          );
        } else {
          // Geolocation API를 지원하지 않는 경우 처리
          alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
          setIsLoading(false);
        }
      });
    };

    loadKakaoMap();
  }, []);

  const moveToLocation = () => {
    if (userLocation && map) {
      map.setLevel(mapLevel);
      map.panTo(userLocation);
    } else {
      alert('사용자 위치 정보가 설정되지 않았습니다.');
    }
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
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            displayPlaces(data);
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
    if (map) {
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
          position: new window.kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });

        const content = `
        <div class="flex items-center px-2 py-1 bg-white border border-gray-300 rounded text-sm font-medium shadow-sm ml-12">
          ${place.place_name}
        </div>`;

        // eslint-disable-next-line no-new
        new window.kakao.maps.CustomOverlay({
          map,
          position: new window.kakao.maps.LatLng(place.y, place.x),
          content,
          yAnchor: 1,
          xAnchor: 0.5,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedPlace(place);
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          showModal();
        });

        bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
      });

      map.setBounds(bounds);
    }
  };

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'flex';
      modalRef.current.style.alignItems = 'center';
      modalRef.current.style.justifyContent = 'center';
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'none';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-4 z-10 flex w-4/5 max-w-lg -translate-x-1/2 transform items-center justify-center rounded-md border bg-white p-1 shadow">
        <input
          type="text"
          placeholder="장소 검색"
          className="flex-grow rounded-md border-0 p-2 focus:outline-none focus:ring-0"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
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
      <div ref={mapRef} className="w-ful relative h-[calc(100vh-109px)]" />
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
          onClick={moveToLocation}
        >
          농구장 제보
        </Button>
      </div>
      {selectedPlace && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          ref={modalRef}
          className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
          style={{ display: 'none' }}
        >
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <div>
              <strong>{selectedPlace.place_name}</strong>
              <br />
              주소: {selectedPlace.address_name}
              <br />
              전화번호: {selectedPlace.phone || '없음'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KakaoMap;
