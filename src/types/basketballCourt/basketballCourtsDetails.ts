export interface BasketballCourtsDetails {
  courtId: number;
  courtName: string;
  address: string;
  latitude: number;
  longitude: number;
  courtType: string;
  indoorOutdoor: string;
  courtSize: string;
  hoopCount: number;
  nightLighting: string;
  openingHours: string;
  fee: string;
  parkingAvailable: string;
  phoneNum: string | null;
  website: string | null;
  convenience: string[] | null;
  additionalInfo: string | null;
  photoUrl: string | null;
  informerId: number;
  chatroomId: number;
}
