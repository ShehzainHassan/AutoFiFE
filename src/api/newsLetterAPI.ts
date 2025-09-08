import { limitedAxios } from "./rateLimitedAxios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const newsLetterAPI = {
  saveInfo: async (email: string) => {
    const response = await limitedAxios.post(
      `${API_BASE_URL}/NewsLetter/subscribe-email`,
      {
        email,
      }
    );
    return response.data;
  },
};

export default newsLetterAPI;
