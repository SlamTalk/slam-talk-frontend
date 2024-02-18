import React, { useEffect, useState, useRef, FC } from 'react';
import { Button } from '@nextui-org/react';
import { IoSearchSharp } from 'react-icons/io5';

interface KakaoMapModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
}

const KakaoMapModal: FC<KakaoMapModalProps> = ({
  visible,
  onClose,
  onSelectAddress,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    const initMap = (lat = 37.5665, lng = 126.978) => {
      window.kakao.maps.load(() => {
        const mapOption: kakao.maps.MapOptions = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 4,
        };

        const map = new kakao.maps.Map(mapRef.current!, mapOption);
        mapInstance.current = map; // 지도 인스턴스 저장

        // 지도 클릭 이벤트 리스너 추가
        kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
          // 기존에 표시된 마커가 있으면 지도에서 제거
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          // 클릭한 위치에 새 마커 생성
          const position = mouseEvent.latLng;
          const marker = new kakao.maps.Marker({
            position,
          });
          marker.setMap(map);
          markerRef.current = marker;

          // 클릭한 위치의 주소 정보 가져오기
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.coord2Address(
            position.getLng(),
            position.getLat(),
            (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                setSelectedAddress(address); // 선택된 주소 업데이트
              }
            }
          );
        });
      });
    };

    if (visible && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          initMap(latitude, longitude);
        },
        () => {
          initMap();
        },
        { enableHighAccuracy: true }
      );
    }
  }, [visible]);

  const handleSearch = (e: any) => {
    e.preventDefault();

    if (!searchKeyword.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }

    const places = new kakao.maps.services.Places();

    places.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK && mapInstance.current) {
        // 기존에 표시된 마커가 있으면 지도에서 제거
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        const firstResult = data[0];
        const position = new kakao.maps.LatLng(firstResult.y, firstResult.x);

        // 지도 중심 이동
        mapInstance.current.setCenter(position);

        // 선택된 주소 업데이트
        setSelectedAddress(firstResult.address_name);

        // 마커 생성
        const marker = new kakao.maps.Marker({
          position,
        });
        marker.setMap(mapInstance.current);

        markerRef.current = marker;
      } else {
        alert('검색 결과가 존재하지 않습니다.');
      }
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-[500px] rounded-lg bg-white p-6 shadow-lg dark:bg-default-100">
        <h2 className="mb-4 text-xl font-bold">지도에서 주소 찾기</h2>
        <form
          className="absolute z-50 m-2 flex items-center rounded-md bg-background p-1 shadow-md"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchKeyword}
            placeholder="장소 검색"
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-grow rounded-md border-0 p-2 focus:outline-none focus:ring-0"
          />
          <button
            aria-label="Search"
            type="submit"
            className="ml-2 mr-2 flex h-full items-center justify-center rounded-md focus:outline-none"
            onClick={handleSearch}
          >
            <IoSearchSharp
              size={20}
              className="text-gray-400 hover:text-black"
            />
          </button>
        </form>
        <div ref={mapRef} className="h-80 w-full" />
        <div className="mt-4 flex justify-end">
          <Button
            className="mr-2"
            type="submit"
            color="primary"
            onClick={() => onSelectAddress(selectedAddress)}
          >
            확인
          </Button>
          <Button className="bg-gray-200 dark:bg-default-300" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KakaoMapModal;
