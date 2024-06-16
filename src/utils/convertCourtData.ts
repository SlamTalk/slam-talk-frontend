import {
  BasketballCourtReportAdmin,
  ConvertedCourtData,
} from '@/types/basketballCourt/basketballCourtReport';

export const mapValue = (
  value: string | null,
  mapping: { [key: string]: string }
): string | null => {
  if (value === null) return null;
  return mapping[value] || null;
};

export const convertCourtData = (
  data: BasketballCourtReportAdmin
): ConvertedCourtData => ({
  courtId: data.courtId,
  courtName: data.courtName,
  address: data.address,
  latitude: data.latitude,
  longitude: data.longitude,
  courtType: data.courtType,
  indoorOutdoor: data.indoorOutdoor || null,
  courtSize: data.courtSize,
  hoopCount: data.hoopCount,
  nightLighting: mapValue(data.nightLighting, {
    있음: 'LIGHT',
    없음: 'NON_LIGHT',
  }),
  openingHours: mapValue(data.openingHours, {
    '24시': 'ALL_NIGHT',
    제한: 'NON_ALL_LIGHT',
  }),
  fee: mapValue(data.fee, {
    무료: 'FREE',
    유료: 'NON_FREE',
  }),
  parkingAvailable: mapValue(data.parkingAvailable, {
    가능: 'PARKING_AVAILABLE',
    불가능: 'PARKING_UNAVAILABLE',
  }),
  phoneNum: data.phoneNum,
  website: data.website,
  convenience: data.convenience ?? [],
  photoUrl: data.photoUrl ?? null,
  additionalInfo: data.additionalInfo,
  informerId: data.informerId,
});
