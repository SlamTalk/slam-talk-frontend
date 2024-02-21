export interface BasketballCourtReport {
  file: File | null;
  courtName: string;
  address: string;
  latitude: number;
  longitude: number;
  courtType: string | null;
  indoorOutdoor: string | null;
  courtSize: string | null;
  hoopCount: number | null;
  nightLighting: string; // default: 없음
  openingHours: string; // 제한
  fee: string; // 무료
  parkingAvailable: string; // 불가능
  phoneNum: string | null;
  website: string | null;
  convenience: string | null;
  additionalInfo: string | null;
}
