import axios from 'axios';

export const postCommunity = async (
  article: any,
  accessToken: string | null
) => {
  try {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/community/new-form`,
        article,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
          timeout: 10000,
        }
      )
      .then((res) => console.log(res));
  } catch (error) {
    console.error(error);
  }
};
