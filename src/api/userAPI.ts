import { LoginDTO, User } from "@/interfaces/user";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const userAPI = {
  saveUser: async (formData: User) => {
    const response = await axios.post(`${API_BASE_URL}/user/add`, {
      Name: formData.name,
      Email: formData.email,
      Password: formData.password,
    });
    return response.data;
  },
  loginUser: async (formData: LoginDTO) => {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      Email: formData.email,
      Password: formData.password,
    });
    return response.data;
  },
  addUserLike: async (userId: number, vin: string) => {
    const response = await axios.post(`${API_BASE_URL}/user/add-user-like`, {
      userId,
      vehicleVin: vin,
    });
    return response.data;
  },
  removeUserLike: async (userId: number, vin: string) => {
    const response = await axios.delete(
      `${API_BASE_URL}/user/remove-user-like`,
      {
        data: {
          userId,
          vehicleVin: vin,
        },
      }
    );
    return response.data;
  },
  getUserLikedVins: async (userId: number) => {
    const response = await axios.get(
      `${API_BASE_URL}/user/get-user-liked-vins/${userId}`
    );
    return response.data;
  },
};

export default userAPI;
