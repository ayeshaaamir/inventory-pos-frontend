import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/constants";

const API_URL = `${API_BASE_URL}auth`;

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    const { token } = response.data;
    Cookies.set("authToken", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error.response?.data || "Unable to log in. Please try again.";
    } else {
      console.error("Unknown error:", error);
      throw "Unable to log in. Please try again.";
    }
  }
};
