import axiosInstance from '@/app/api/axiosInstance';

const getNotifications = async () => {
  try {
    const response = await axiosInstance.get('/api/notifications');
    const notificationsData = response.data.results;
    return notificationsData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getNotifications;
