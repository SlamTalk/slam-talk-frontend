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
  nightLighting: string | null;
  openingHours: string | null;
  fee: string | null;
  parkingAvailable: string | null;
  phoneNum: string | null;
  website: string | null;
  convenience: string | null;
  additionalInfo: string | null;
}
