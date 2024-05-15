import axiosInstance from '@/app/api/axiosInstance';

const getMyMateMatchingData = async () => {
  const response = await axiosInstance
    .get('/api/mate/my-list')
    .then((res) => res.data.results);

  return response;
};

export default getMyMateMatchingData;
