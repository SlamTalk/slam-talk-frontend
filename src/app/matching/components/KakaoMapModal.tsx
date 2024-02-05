'use client';

import React, { useEffect, useState, useRef, FC } from 'react';
import { Button } from '@nextui-org/react';

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
  const [selectedAddress, setSelectedAddress] = useState('');

  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (visible && mapRef.current) {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시청 주소
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, mapOption);

        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          const markerPosition = mouseEvent.latLng;
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);
          markerRef.current = marker;

          // 주소 가져오는 로직
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(
            markerPosition.getLng(),
            markerPosition.getLat(),
            (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                setSelectedAddress(address);
              }
            }
          );
        });
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-[500px] rounded-lg bg-white p-6 shadow-lg dark:bg-default-100">
        <h2 className="mb-4 text-xl font-bold">지도에서 주소 찾기</h2>
        <div ref={mapRef} className="h-80 w-full" />
        <div className="mt-4 flex justify-end">
          <Button
            className="mr-2"
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
