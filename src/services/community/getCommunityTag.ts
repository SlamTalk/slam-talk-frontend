import axiosInstance from '@/app/api/axiosInstance';

export const getCommunityTag = async (category: string) => {
  try {
    const res = await axiosInstance(`/api/community/category/${category}`);
    const categoriedList = res.data.results;
    return categoriedList;
  } catch (err) {
    return err;
  }
};
