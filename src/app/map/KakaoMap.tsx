'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';
import { IoSearchSharp } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import { BiSolidLocationPlus } from 'react-icons/bi';
import CourtReport from './CourtReport';
import CourtDetails from './CourtDetail';
import axiosInstance from '../api/axiosInstance';
import { fetchAccessToken } from '../api/auth';

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
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [, setIsLoading] = useState<boolean>(true);
  const [mapLevel] = useState(3);
  const [isCourtReportVisible, setIsCourtReportVisible] = useState(false);
  const [isCourtDetailsVisible, setIsCourtDetailsVisible] = useState(false);
  const [, setAccessToken] = useState<string | null>(null);

  // 백엔드 API로부터 농구장 정보 가져오기
  const fetchBasketballCourts = async () => {
    try {
      await fetchAccessToken(setAccessToken);

      const response = await axiosInstance.get('/api/map');

      if (response.status === 200) {
        // 성공적으로 데이터를 가져왔을 경우
        console.log(response);
        const courtData = response.data;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        displayBasketballCourts(courtData);
      }
    } catch (error) {
      console.error('농구장 정보를 불러오는데 실패했습니다:', error);
    }
  };

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
          const options = { center: userLatLng, level: mapLevel };
          const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
          setMap(kakaoMap);
          setIsLoading(false);

          fetchBasketballCourts();
        },
        (error) => {
          console.error(`Error: ${error.message}`);
          if (error.code === error.PERMISSION_DENIED) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLevel]);

  const moveToLocation = () => {
    if (userLocation && map) {
      map.setLevel(mapLevel);
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
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            displayBasketballCourts(data);
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

  const displayBasketballCourts = (courts: any) => {
    if (!map) return;

    const bounds = new window.kakao.maps.LatLngBounds();
    const markerImageSrc = '/icons/marker-img.png';
    const imageSize = new window.kakao.maps.Size(48);
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      imageSize
    );

    courts.forEach((court: any) => {
      const { latitude, longitude, name } = court;
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(latitude, longitude),
        image: markerImage,
      });

      const content = `<div class="flex items-center px-2 py-1 bg-white text-black border border-gray-300 rounded text-sm font-medium shadow-sm ml-12">${name}</div>`;

      // eslint-disable-next-line no-new
      new window.kakao.maps.CustomOverlay({
        map,
        position: new window.kakao.maps.LatLng(latitude, longitude),
        content,
        yAnchor: 1,
        xAnchor: 0.5,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedPlace(court);
        setIsCourtDetailsVisible(true);
      });

      bounds.extend(new window.kakao.maps.LatLng(latitude, longitude));
    });

    map.setBounds(bounds);
  };

  // const displayPlaces = (places: any) => {
  //   if (!map) return;

  //   const bounds = new window.kakao.maps.LatLngBounds();
  //   const markerImageSrc = '/icons/marker-img.png';
  //   const imageSize = new window.kakao.maps.Size(48);
  //   const markerImage = new window.kakao.maps.MarkerImage(
  //     markerImageSrc,
  //     imageSize
  //   );

  //   places.forEach((place: any) => {
  //     const marker = new window.kakao.maps.Marker({
  //       map,
  //       position: new window.kakao.maps.LatLng(place.y, place.x),
  //       image: markerImage,
  //     });

  //     const content = `<div class="flex items-center px-2 py-1 bg-white text-black border border-gray-300 rounded text-sm font-medium shadow-sm ml-12">${place.place_name}</div>`;

  //     // eslint-disable-next-line no-new
  //     new window.kakao.maps.CustomOverlay({
  //       map,
  //       position: new window.kakao.maps.LatLng(place.y, place.x),
  //       content,
  //       yAnchor: 1,
  //       xAnchor: 0.5,
  //     });

  //     window.kakao.maps.event.addListener(marker, 'click', () => {
  //       setSelectedPlace(place);
  //       setIsCourtDetailsVisible(true);
  //     });

  //     bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
  //   });

  //   map.setBounds(bounds);
  // };

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

  // const showCourtDetails = () => {
  //   setIsCourtDetailsVisible(true);
  // };

  // const closeCourtDetails = () => {
  //   setIsCourtDetailsVisible(false);
  // };

  // useEffect(() => {
  //   // Initialize the map and fetch basketball court data
  //   if (!map) return;

  //   fetchBasketballCourts();
  // }, [map]);

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
        {selectedPlace && isCourtDetailsVisible && (
          <CourtDetails
            selectedPlace={selectedPlace}
            isVisible={isCourtDetailsVisible}
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
