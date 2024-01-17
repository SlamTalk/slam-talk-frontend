'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

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
  const [, setUserLocation] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
        setMap(kakaoMap);

        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const userLatLng = new window.kakao.maps.LatLng(
              latitude,
              longitude
            );
            setUserLocation(userLatLng);
            kakaoMap.setCenter(userLatLng);
          });
        }
      });
    };

    loadKakaoMap();
  }, []);

  const handleSearch = () => {
    if (!searchKeyword) {
      alert('검색어를 입력하세요.');
      return;
    }

    if (map) {
      const ps = new window.kakao.maps.services.Places();

      // 사용자 위치 주변에서 검색
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
        { location: map.getCenter() } // 현재 지도 중심을 기준으로 검색
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
      document.body.style.overflow = 'hidden'; // 스크롤 없음
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
      <div
        ref={mapRef}
        className="absolute left-0 right-0 top-0 z-0 h-[calc(100vh-109px)] w-full overflow-hidden"
      />
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
