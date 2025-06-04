import { LoginDTO, User } from "@/interfaces/user";
import { getTokenFromLocalStorage } from "@/utilities/utilities";
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
  getUserSearches: async (userId: number) => {
    const response = await axios.get(
      `${API_BASE_URL}/user/get-user-saved-searches/${userId}`
    );
    return response.data;
  },
  saveUserSearch: async (userId: number, search: string) => {
    const token = getTokenFromLocalStorage();
    const response = await axios.post(
      `${API_BASE_URL}/user/save-search`,
      {
        userId,
        search,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  removeUserSearch: async (userId: number, search: string) => {
    const token = getTokenFromLocalStorage();
    const response = await axios.delete(`${API_BASE_URL}/user/delete-search`, {
      data: {
        userId,
        search,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  addUserLike: async (userId: number, vin: string) => {
    const token = getTokenFromLocalStorage();
    const response = await axios.post(
      `${API_BASE_URL}/user/add-user-like`,
      {
        userId,
        vehicleVin: vin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  removeUserLike: async (userId: number, vin: string) => {
    const token = getTokenFromLocalStorage();
    console.log(token);
    const response = await axios.delete(
      `${API_BASE_URL}/user/remove-user-like`,
      {
        data: {
          userId,
          vehicleVin: vin,
        },
        headers: {
          Authorization: `Bearer ${token}`,
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
