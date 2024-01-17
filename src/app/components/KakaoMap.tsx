'use client';

import React, { FC, useEffect, useRef, useState } from 'react';

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

      places.forEach((place: any) => {
        const marker = new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(place.y, place.x),
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

  return (
    <div className="relative">
      <div className="absolute left-4 top-4 z-10">
        <input
          type="text"
          placeholder="장소 검색"
          className="rounded-md border p-2"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="ml-2 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
          검색
        </button>
      </div>
      <div
        ref={mapRef}
        className="absolute left-0 top-0 z-0 h-screen w-screen overflow-hidden"
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
