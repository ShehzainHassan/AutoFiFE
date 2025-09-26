import { DEFAULT_MAKE, DEFAULT_MODEL } from "@/constants";
import { Questionnaire } from "@/interfaces/questionnaire";
import {
  ListingNotification,
  RecommendationsResponse,
  SimilarVehicleResponse,
  Vehicle,
  VehicleFeatures,
  VehicleFilter,
  VehicleListResult,
  VehicleOptions,
} from "@/interfaces/vehicle";
import { sanitizeVehicleFilters } from "@/utilities/utilities";
import { limitedAxios } from "./rateLimitedAxios";
import { rateLimitedClient } from "./apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const RECOMMENDER_SYSTEM_BASE_URL = process.env.NEXT_PUBLIC_RECOMMENDER_SYSTEM;

const vehicleAPI = {
  getAllVehicles: async (
    status: string | null,
    offset: number,
    pageSize: number
  ) => {
    const response = await limitedAxios.get<VehicleListResult>(
      `${API_BASE_URL}/Vehicle`,
      {
        params: { pageView: pageSize, offset, status },
      }
    );
    return response.data;
  },
  getAllMakes: async () => {
    const response = await limitedAxios.get(
      `${API_BASE_URL}/Vehicle/get-makes`
    );
    return response.data;
  },
  getAllCategories: async () => {
    const response = await limitedAxios.get<string[]>(
      `${API_BASE_URL}/Vehicle/get-categories`
    );
    return response.data;
  },
  getByMake: async (make: string, offset: number, pageSize: number) => {
    const response = await limitedAxios.get<VehicleListResult>(
      `${API_BASE_URL}/Vehicle/by-make`,
      {
        params: { pageView: pageSize, offset, make },
      }
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await limitedAxios.get<Vehicle>(
      `${API_BASE_URL}/Vehicle/${id}`
    );
    return response.data;
  },
  getAllColors: async () => {
    const response = await limitedAxios.get(
      `${API_BASE_URL}/Vehicle/get-colors`
    );
    return response.data;
  },
  getCarFeatures: async (make: string, model: string) => {
    const response = await limitedAxios.get<VehicleFeatures>(
      `${API_BASE_URL}/Vehicle/features`,
      {
        params: { make, model },
      }
    );
    return response.data;
  },
  getVehicleCount: async (filters: VehicleFilter) => {
    const sanitizedFilters = sanitizeVehicleFilters(filters);
    const response = await limitedAxios.get<number>(
      `${API_BASE_URL}/Vehicle/total-vehicle-count`,
      {
        params: sanitizedFilters,
      }
    );

    return response.data;
  },
  getGearboxCount: async (filters: VehicleFilter) => {
    const sanitizedFilters = sanitizeVehicleFilters(filters);
    const response = await limitedAxios.get(
      `${API_BASE_URL}/Vehicle/gearbox-count`,
      {
        params: sanitizedFilters,
      }
    );

    return response.data;
  },
  getColorsCount: async (filters: VehicleFilter) => {
    const sanitizedFilters = sanitizeVehicleFilters(filters);

    const response = await limitedAxios.get(
      `${API_BASE_URL}/Vehicle/colors-count`,
      {
        params: sanitizedFilters,
      }
    );

    return response.data;
  },
  searchVehicles: async (
    pageSize: number,
    offset: number,
    make?: string | null,
    model?: string | null,
    startPrice?: number | null,
    endPrice?: number | null,
    status?: string | null,
    mileage?: number | null,
    startYear?: number | null,
    endYear?: number | null,
    sortOrder?: string | null,
    gearbox?: string | null,
    selectedColors?: string | null
  ) => {
    const response = await limitedAxios.get<Vehicle[]>(
      `${API_BASE_URL}/Vehicle/search-vehicles`,
      {
        params: {
          pageView: pageSize,
          offset,
          ...(make !== DEFAULT_MAKE ? { make } : {}),
          ...(model !== DEFAULT_MODEL ? { model } : {}),
          startPrice,
          endPrice,
          status,
          mileage,
          startYear,
          endYear,
          sortOrder,
          gearbox,
          selectedColors,
        },
      }
    );

    return response.data;
  },
  saveQuestionnaire: async (
    questionnaire: Questionnaire,
    vehicleId: number
  ) => {
    const response = await limitedAxios.post(
      `${API_BASE_URL}/Vehicle/save-questionnaire?vehicleId=${vehicleId}`,
      questionnaire
    );
    return response.data;
  },
  getSimilarVehicles: async (vehicleId: number) => {
    const response = await limitedAxios.get<SimilarVehicleResponse>(
      `${RECOMMENDER_SYSTEM_BASE_URL}/api/recommendations/similar/${vehicleId}`
    );
    return response.data;
  },
  getRecommendations: async (userId: number) => {
    const response = await limitedAxios.get<RecommendationsResponse>(
      `${RECOMMENDER_SYSTEM_BASE_URL}/api/recommendations/user/${userId}`
    );
    return response.data;
  },
  getVehicleOptions: async () => {
    const response = await limitedAxios.get<VehicleOptions>(
      `${API_BASE_URL}/Vehicle/get-vehicle-options`
    );
    return response.data;
  },
  addListingNotification: async (notification: ListingNotification) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/Vehicle/add-listing-notification`,
      {
        vehicleId: notification.vehicleId,
        userId: notification.userId,
        userName: notification.userName,
        userEmail: notification.userEmail,
      }
    );
    return response.data;
  },
};

export default vehicleAPI;
