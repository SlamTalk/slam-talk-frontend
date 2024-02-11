import axiosInstance from '@/app/api/axiosInstance';
import { BasketballCourts } from '@/types/basketballCourt/basketballCourts';

const getCourts = async () => {
  try {
    const response = await axiosInstance.get('/api/map/courts');
    const courtsData = response.data.results;
    const basketballCourts: BasketballCourts[] = courtsData.map(
      (court: BasketballCourts) => ({
        courtId: court.courtId,
        address: court.address,
        courtName: court.courtName,
        latitude: court.latitude,
        longitude: court.longitude,
      })
    );
    return basketballCourts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getCourts;
