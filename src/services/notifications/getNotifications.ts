import axiosInstance from '@/app/api/axiosInstance';
import { InAppNotification } from '@/types/notifications/InAppNotification';

const getNotifications = async () => {
  try {
    const response = await axiosInstance.get('/api/notifications');
    const notificationsData: InAppNotification[] = response.data.results;
    return notificationsData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getNotifications;
