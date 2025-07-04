import { ContactFormData } from "@/interfaces/contact-info";
import apiClient from "./apiClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const contactInfoAPI = {
  saveInfo: async (formData: ContactFormData) => {
    const response = await apiClient.post(`${API_BASE_URL}/contact/add`, {
      firstName: formData.fname,
      lastName: formData.lname,
      selectedOption: formData.selected,
      vehicleName: formData.vehicleName,
      postCode: formData.postcode,
      email: formData.email,
      phoneNumber: formData.phone,
      preferredContactMethod: formData.preferredContact,
      comment: formData.commentText,
      emailMeNewResults: formData.emailNotifs,
    });
    return response.data;
  },
};

export default contactInfoAPI;
