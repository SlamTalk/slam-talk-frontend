export interface CourtData {
  courtId: number; // 필수
  courtName: string; // 필수
  address: string; // 필수
  latitude: number; // 필수
  longitude: number; // 필수
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
  informerId: number;
}

export interface PutCourtData {
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
  convenience: string;
  additionalInfo: string;
  photoUrl: string;
  informerId: number;
  chatroomId: number;
}

export interface AdminCourtDetailsProps {
  data: {
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
    informerId: number;
  };
  onClose: () => void;
}
