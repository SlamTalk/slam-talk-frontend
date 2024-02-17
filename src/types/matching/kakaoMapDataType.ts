/* eslint-disable max-classes-per-file */
declare namespace kakao.maps {
  export class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  export class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
  }

  // 이벤트 처리 관련 타입 정의를 여기에 추가합니다.
  export interface MouseEvent {
    latLng: LatLng;
    // 필요에 따라 다른 속성 추가
  }

  // event 네임스페이스 내에 addListener 함수 정의를 유지합니다.
  export namespace event {
    function addListener(
      target: any, // 대상 객체
      type: string, // 이벤트 타입
      callback: (mouseEvent: MouseEvent) => void // 콜백 함수
    ): void;
  }

  export namespace services {
    class Geocoder {
      coord2Address(
        lng: number,
        lat: number,
        callback: (result: any, status: Status) => void
      ): void;
    }

    class Point {
      constructor(x: number, y: number);
      equals(point: Point): boolean;
      toString(): string;
    }

    class Places {
      keywordSearch(
        keyword: string,
        callback: (result: any, status: Status) => void
      ): void;
    }

    enum Status {
      OK = 'OK',
      ERROR = 'ERROR',
      ZERO_RESULT = 'ZERO_RESULT',
      OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
    }

    interface Place {
      id: string;
      place_name: string;
      address_name: string;
      x: string;
      y: string;
    }

    type PlacesSearchResult = Place[];
  }

  export class CustomOverlay {
    constructor(options: CustomOverlayOptions);
    setMap(map: Map | null): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  interface MarkerOptions {
    position: LatLng;
  }

  interface CustomOverlayOptions {
    position: LatLng;
    content: HTMLElement;
    xAnchor: number;
    yAnchor: number;
  }
}
