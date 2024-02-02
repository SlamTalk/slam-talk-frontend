interface BasketballCourt {
  courtId: number;
  courtName: string;
  address: string;
  latitude: number;
  longitude: number;
  courtType: string;
  indoorOutdoor: string;
  courtSize: string;
  hoopCount: number;
  nightLighting: boolean;
  openingHours: boolean;
  fee: boolean;
  parkingAvailable: boolean;
  phoneNum: string;
  website: string;
  convenience: string[];
  additionalInfo: string;
  photoUrl: string;
}

export const results: BasketballCourt[] = [
  {
    courtId: 1,
    courtName: '유고걸',
    address: '서울 강남구 학동로56길 37',
    latitude: 37.5248,
    longitude: 127.0432,
    courtType: '우레탄',
    // 실내, 야외
    indoorOutdoor: '실내',
    courtSize: '농구코트 4면',
    hoopCount: 2,
    nightLighting: true,
    // 24시간: true, 제한: false
    openingHours: true,
    // 유료: true, 무료: false
    fee: true,
    parkingAvailable: true,
    phoneNum: '123-456-7890',
    website: 'http://example.com',
    convenience: ['편의점', '화장실'],
    additionalInfo: '늦게까지해서 퇴근하고 운동하기 좋아요!',
    photoUrl: 'http://example.com/court.jpg',
  },
  {
    courtId: 2,
    courtName: '한강시민공원 농구장',
    address: '서울 강남구 압구정동 386',
    latitude: 37.51485,
    longitude: 127.0432,
    courtType: '흙',
    indoorOutdoor: '야외',
    courtSize: '농구코트 1면',
    hoopCount: 2,
    nightLighting: true,
    openingHours: true,
    fee: true,
    parkingAvailable: true,
    phoneNum: '123-456-7890',
    website: 'http://example.com',
    convenience: ['샤워장', '음수대', '매점'],
    additionalInfo: '사람 항상 많아요! 채팅창 확인하고 방문 추천드려요.',
    photoUrl: 'http://example.com/court.jpg',
  },
  {
    courtId: 3,
    courtName: '잠실한강공원 농구장',
    address: '서울 송파구 잠실동 1-1',
    latitude: 37.5204,
    longitude: 127.0738,
    courtType: '흙',
    indoorOutdoor: '야외',
    courtSize: '농구코트 4면',
    hoopCount: 2,
    nightLighting: true,
    openingHours: true,
    fee: true,
    parkingAvailable: true,
    phoneNum: '123-456-7890',
    website: 'http://example.com',
    convenience: ['편의점'],
    additionalInfo: '바닥 새로 깔아서 뛰기 좋아요.',
    photoUrl: 'http://example.com/court.jpg',
  },
  // Add more fake data if needed
];

// 실제 데이터
//   "results": [
//     {
//       "courtId": 0,
//       "courtName": "string",
//       "address": "string",
//       "latitude": 0,
//       "longitude": 0,
//       "courtType": "string",
//       "indoorOutdoor": "string",
//       "courtSize": "string",
//       "hoopCount": 0,
//       "nightLighting": true,
//       "openingHours": true,
//       "fee": true,
//       "parkingAvailable": true,
//       "phoneNum": "string",
//       "website": "string",
//       "convenience": "string",
//       "additionalInfo": "string",
//       "photoUrl": "string"
//     }
//   ]
