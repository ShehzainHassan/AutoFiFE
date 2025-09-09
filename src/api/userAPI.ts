import { LoginDTO, User } from "@/interfaces/user";
import { rateLimitedClient } from "./apiClient";
import { limitedAxios } from "./rateLimitedAxios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const userAPI = {
  getAllUsersCount: async () => {
    const response = await limitedAxios.get(
      `${API_BASE_URL}/user/all-users-count`
    );
    return response.data;
  },
  refreshToken: async () => {
    const response = await limitedAxios.post(`${API_BASE_URL}/user/refresh`);
    return response.data;
  },
  saveUser: async (formData: User) => {
    const response = await limitedAxios.post(`${API_BASE_URL}/user/add`, {
      Name: formData.name,
      Email: formData.email,
      Password: formData.password,
    });
    return response.data;
  },
  loginUser: async (formData: LoginDTO) => {
    const response = await limitedAxios.post(`${API_BASE_URL}/user/login`, {
      Email: formData.email,
      Password: formData.password,
    });
    return response.data;
  },
  getUserById: async (id: number) => {
    const response = await rateLimitedClient.get(`${API_BASE_URL}/user/${id}`);
    return response.data;
  },
  getOldestUserDate: async () => {
    const response = await rateLimitedClient.get(
      `${API_BASE_URL}/user/oldest-user`
    );
    return response.data;
  },
  getUserSearches: async () => {
    const response = await rateLimitedClient.get(
      `${API_BASE_URL}/user/get-user-saved-searches`
    );
    return response.data;
  },
  saveUserSearch: async (userId: number, search: string) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/user/save-search`,
      {
        userId,
        search,
      }
    );
    return response.data;
  },
  removeUserSearch: async (userId: number, search: string) => {
    const response = await rateLimitedClient.delete(
      `${API_BASE_URL}/user/delete-search`,
      {
        data: {
          userId,
          search,
        },
      }
    );
    return response.data;
  },
  addUserInteraction: async (
    vehicleId: number,
    interactionType: string,
    userId: number
  ) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/user/add-interaction`,
      {
        UserId: userId,
        VehicleId: vehicleId,
        InteractionType: interactionType,
      }
    );
    return response.data;
  },
  addUserLike: async (userId: number, vin: string) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/user/add-user-like`,
      {
        userId,
        vehicleVin: vin,
      }
    );
    return response.data;
  },
  removeUserLike: async (userId: number, vin: string) => {
    const response = await rateLimitedClient.delete(
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
  getUserLikedVins: async () => {
    const response = await rateLimitedClient.get(
      `${API_BASE_URL}/user/get-user-liked-vins`
    );
    return response.data;
  },
};

export default userAPI;
