import axiosInstance from '@/app/api/axiosInstance';
import { BasketballCourt } from '@/types/basketballCourt';

const getBasketballCourts = async () => {
  const result = await axiosInstance.get('/api/map/courts');
  const court = result.data.results;
  const courtData: BasketballCourt = {
    courtId: court.courtId,
    address: court.address,
    courtName: court.courtName,
    latitude: court.latitude,
    longitude: court.longitued,
  };
  return courtData;
};

export default getBasketballCourts;
