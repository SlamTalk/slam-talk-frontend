import axiosInstance from '@/app/api/axiosInstance';
import { BasketballCourts } from '@/types/basketballCourt/basketballCourts';

const getBasketballCourts = async () => {
  const result = await axiosInstance.get('/api/map/courts');
  const court = result.data.results;
  const courtData: BasketballCourts = {
    courtId: court.courtId,
    address: court.address,
    courtName: court.courtName,
    latitude: court.latitude,
    longitude: court.longitued,
  };
  return courtData;
};

export default getBasketballCourts;
