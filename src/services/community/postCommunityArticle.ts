import axios from 'axios';

export const postCommunity = async (
  article: any,
  accessToken: string | null
) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/community/new-form`,
      article,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
        timeout: 10000,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
