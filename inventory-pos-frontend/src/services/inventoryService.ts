import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/constants";
import {
  DeleteProductData,
  ProductData,
  ProductTableData,
} from "../interfaces/productData";

const token = Cookies.get("authToken");

export const addProduct = async (productData: ProductData): Promise<void> => {
  try {
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    await axios.post(`${API_BASE_URL}inventory`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const deleteProduct = async (
  productData: DeleteProductData
): Promise<void> => {
  try {
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

export const getProducts = async (): Promise<ProductTableData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}inventory`);
    return response.data.inventory;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products.");
  }
};
