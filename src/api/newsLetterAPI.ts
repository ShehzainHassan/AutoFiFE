import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const newsLetterAPI = {
  saveInfo: async (email: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/NewsLetter/subscribe-email`,
      {
        email,
      }
    );
    return response.data;
  },
};

export default newsLetterAPI;
