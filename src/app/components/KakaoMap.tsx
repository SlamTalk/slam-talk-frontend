'use client';

import React, { useEffect, useRef } from 'react';
// import styles from './map.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        // 지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
        level: 3, // 지도의 레벨(확대, 축소 정도)
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const map = new window.kakao.maps.Map(mapRef.current, options); // 지도 생성 및 객체 리턴
    });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default KakaoMap;
