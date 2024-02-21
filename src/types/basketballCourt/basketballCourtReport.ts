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
  nightLighting: string | null; // default: 없음
  openingHours: string | null; // 제한
  fee: string | null; // 무료
  parkingAvailable: string | null; // 불가능
  phoneNum: string | null;
  website: string | null;
  convenience: string | null;
  additionalInfo: string | null;
}
