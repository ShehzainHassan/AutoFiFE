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
};

export default userAPI;
