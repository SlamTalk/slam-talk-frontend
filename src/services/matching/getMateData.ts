import axiosInstance from '@/app/api/axiosInstance';
import { InfiniteMatePost, MatePost } from '@/types/matching/mateDataType';

export const fetchMateData = async (): Promise<MatePost[]> => {
  const response = await axiosInstance
    .get('/api/mate/list')
    .then((res) => res.data.results.matePostList);

  return response;
};

export const infiniteFetchMateData = async (
  pageParams: string,
  selectedLevel: string,
  selectedCity: string,
  selectedPosition: string,
  keywordProp: string | null
): Promise<InfiniteMatePost> => {
  let queryParams = `/api/mate/list?cursorTime=${pageParams || ''}`;

  if (selectedLevel) {
    queryParams += `&skillLevel=${selectedLevel}`;
  }
  if (selectedCity) {
    queryParams += `&location=${selectedCity}`;
  }
  if (selectedPosition) {
    queryParams += `&position=${selectedPosition}`;
  }
  if (keywordProp) {
    queryParams += `&searchWord=${keywordProp}`;
  }

  const response = await axiosInstance
    .get(queryParams)
    .then((res) => res.data.results);

  return response;
};
