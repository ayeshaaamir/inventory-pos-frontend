import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/constants";
import { DeleteProductData } from "../interfaces/productData";

export const deleteProduct = async (
  productData: DeleteProductData
): Promise<void> => {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    await axios.delete(`${API_BASE_URL}inventory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: productData,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { error?: string; message?: string };
      throw new Error(data?.error || data?.message || "Something went wrong.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
