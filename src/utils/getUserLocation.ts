import { Coords } from '@/types/location/userLocationType';

export const getUserLocation = (): Promise<Coords> =>
  new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('이 브라우저는 위치 서비스를 지원하지 않습니다.'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    }
  });

export const getAddressFromCoords = (
  latitude: number,
  longitude: number
): Promise<string> =>
  new Promise((resolve, reject) => {
    window.kakao.maps.load(() => {
      // API가 로드될 때까지 기다림
      const geocoder = new window.kakao.maps.services.Geocoder();
      const callback = (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          resolve(address);
        } else {
          reject(new Error('주소를 가져오는데 실패했습니다.'));
        }
      };
      geocoder.coord2Address(longitude, latitude, callback);
    });
  });
