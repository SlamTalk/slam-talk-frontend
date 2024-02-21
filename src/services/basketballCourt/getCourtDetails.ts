import axiosInstance from '@/app/api/axiosInstance';
import { BasketballCourtsDetails } from '@/types/basketballCourt/basketballCourtsDetails';

const getCourtDetails = async (courtId: number) => {
  try {
    const response = await axiosInstance.get(`/api/map/courts/${courtId}`);

    if (response.status === 200) {
      const court = response.data.results;

      const courtDetails: BasketballCourtsDetails = {
        courtId: court.courtId,
        courtName: court.courtName,
        address: court.address,
        latitude: court.latitude,
        longitude: court.longitude,
        courtType: court.courtType,
        indoorOutdoor: court.indoorOutdoor,
        courtSize: court.courtSize,
        hoopCount: court.hoopCount,
        nightLighting: court.nightLighting,
        openingHours: court.openingHours,
        fee: court.fee,
        parkingAvailable: court.parkingAvailable,
        phoneNum: court.phoneNum,
        website: court.website,
        convenience: court.convenience,
        additionalInfo: court.additionalInfo,
        photoUrl: court.photoUrl,
        chatroomId: court.chatroomId,
      };
      return courtDetails;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return null;
};

export default getCourtDetails;
