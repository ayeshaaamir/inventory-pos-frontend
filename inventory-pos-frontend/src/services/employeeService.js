import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const addEmployee = async (formData, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw new Error("Something went wrong. Please try again.");
  }
};
