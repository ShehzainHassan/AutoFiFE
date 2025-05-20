import { VehicleListResult } from "@/interfaces/vehicle";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const vehicleAPI = {
  getAllVehicles: async (offset: number, pageSize: number) => {
    const response = await axios.get<VehicleListResult>(
      `${API_BASE_URL}/Vehicle`,
      {
        params: { pageView: pageSize, offset },
      }
    );
    return response.data;
  },
  getByMake: async (make: string, offset: number, pageSize: number) => {
    const response = await axios.get<VehicleListResult>(
      `${API_BASE_URL}/Vehicle/by-make`,
      {
        params: { pageView: pageSize, offset, make },
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
    mileage?: number | null,
    startYear?: number | null,
    endYear?: number | null,
    sortOrder?: string | null
  ) => {
    const response = await axios.get<VehicleListResult>(
      `${API_BASE_URL}/Vehicle/search-vehicles`,
      {
        params: {
          pageView: pageSize,
          offset,
          make,
          model,
          startPrice,
          endPrice,
          mileage,
          startYear,
          endYear,
          sortOrder,
        },
      }
    );
    return response.data;
  },
};

export default vehicleAPI;
