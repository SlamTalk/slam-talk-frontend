import axiosInstance from '@/app/api/axiosInstance';

const getMyTeamMatchingData = async () => {
  const response = await axiosInstance
    .get('/api/match/my-list')
    .then((res) => res.data.results);

  return response;
};

export default getMyTeamMatchingData;
