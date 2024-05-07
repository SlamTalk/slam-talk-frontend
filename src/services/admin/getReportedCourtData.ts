import axiosInstance from '@/app/api/axiosInstance';

const getReportedCourtData = async () => {
  try {
    const response = await axiosInstance.get(`/api/admin/stand`);

    if (response.status === 200) {
      const court = response.data.results;
      return court;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return null;
};

export default getReportedCourtData;
