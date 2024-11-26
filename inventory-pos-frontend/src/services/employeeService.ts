import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/constants";

export const addEmployee = async (employeeData: {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    const response = await axios.post(
      `${API_BASE_URL}auth/register`,
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as { message: string }).message ||
        "Something went wrong.";
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unexpected error occurred.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
