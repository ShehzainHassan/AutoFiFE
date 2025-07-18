import { Questionnaire } from "@/interfaces/questionnaire";
import {
  RecommendationsResponse,
  SimilarVehicleResponse,
  Vehicle,
  VehicleFeatures,
  VehicleFilter,
  VehicleListResult,
  VehicleOptions,
} from "@/interfaces/vehicle";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const RECOMMENDER_SYSTEM_BASE_URL = process.env.NEXT_PUBLIC_RECOMMENDER_SYSTEM;

const vehicleAPI = {
  getAllVehicles: async (
    status: string | null,
    offset: number,
    pageSize: number
  ) => {
    const response = await axios.get<VehicleListResult>(
      `${API_BASE_URL}/Vehicle`,
      {
        params: { pageView: pageSize, offset, status }
      }
    );
    return response.data;
  },
  getAllMakes: async () => {
    const response = await axios.get(`${API_BASE_URL}/Vehicle/get-makes`);
    return response.data;
  },
  getByMake: async (make: string, offset: number, pageSize: number) => {
    const response = await axios.get<VehicleListResult>(
      `${API_BASE_URL}/Vehicle/by-make`,
      {
        params: { pageView: pageSize, offset, make }
      }
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axios.get<Vehicle>(`${API_BASE_URL}/Vehicle/${id}`);
    return response.data;
  },
  getAllColors: async () => {
    const response = await axios.get(`${API_BASE_URL}/Vehicle/get-colors`);
    return response.data;
  },
  getCarFeatures: async (make: string, model: string) => {
    const response = await axios.get<VehicleFeatures>(
      `${API_BASE_URL}/Vehicle/features`,
      {
        params: { make, model }
      }
    );
    return response.data;
  },
  getVehicleCount: async (filters: VehicleFilter) => {
    const response = await axios.get<number>(
      `${API_BASE_URL}/Vehicle/total-vehicle-count`,
      {
        params: { ...filters }
      }
    );
    return response.data;
  },
  getGearboxCount: async (filters: VehicleFilter) => {
    const response = await axios.get(`${API_BASE_URL}/Vehicle/gearbox-count`, {
      params: { ...filters }
    });
    return response.data;
  },
  getColorsCount: async (filters: VehicleFilter) => {
    const response = await axios.get(`${API_BASE_URL}/Vehicle/colors-count`, {
      params: { ...filters }
    });
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
    const response = await axios.get<Vehicle[]>(
      `${API_BASE_URL}/Vehicle/search-vehicles`,
      {
        params: {
          pageView: pageSize,
          offset,
          make,
          model,
          startPrice,
          endPrice,
          status,
          mileage,
          startYear,
          endYear,
          sortOrder,
          gearbox,
          selectedColors
        }
      }
    );
    return response.data;
  },
  saveQuestionnaire: async (
    questionnaire: Questionnaire,
    vehicleId: number
  ) => {
    const response = await axios.post(
      `${API_BASE_URL}/Vehicle/save-questionnaire?vehicleId=${vehicleId}`,
      questionnaire
    );
    return response.data;
  },
  getSimilarVehicles: async (vehicleId: number) => {
    const response = await axios.get<SimilarVehicleResponse>(
      `${RECOMMENDER_SYSTEM_BASE_URL}/api/recommendations/similar/${vehicleId}`
    );
    return response.data;
  },
  getRecommendations: async (userId: number) => {
    const response = await axios.get<RecommendationsResponse>(
      `${RECOMMENDER_SYSTEM_BASE_URL}/api/recommendations/user/${userId}`
    );
    return response.data;
  },
  getVehicleOptions: async () => {
    const response = await axios.get<VehicleOptions>(
      `${API_BASE_URL}/Vehicle/get-vehicle-options`
    );
    return response.data;
  }
};

export default vehicleAPI;
