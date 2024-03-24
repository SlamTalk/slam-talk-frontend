import axiosInstance from '@/app/api/axiosInstance';

export const getCommunityTag = async (category: string) => {
  try {
    if (category) {
      const res = await axiosInstance(`/api/community/category/${category}`);
      const categoriedList = res.data.results;
      return categoriedList;
    }
    return 0;
  } catch (err) {
    return err;
  }
};
