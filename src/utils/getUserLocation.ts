import { Coords } from '@/types/location/userLocationType';

interface AddressResult {
  address: {
    address_name: string; // 지번 주소
  };
  road_address: {
    address_name: string | null; // 도로명 주소
  };
}

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
): Promise<{ address: string; roadAddress: string | null }> =>
  new Promise((resolve, reject) => {
    window.kakao.maps.load(() => {
      // API가 로드될 때까지 기다림
      const geocoder = new window.kakao.maps.services.Geocoder();
      const callback = (result: AddressResult[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(result);
          const address = result[0].address.address_name;
          const roadAddress = result[0].road_address
            ? result[0].road_address.address_name
            : null;
          resolve({ address, roadAddress });
        } else {
          reject(new Error('주소를 가져오는데 실패했습니다.'));
        }
      };
      geocoder.coord2Address(longitude, latitude, callback);
    });
  });
