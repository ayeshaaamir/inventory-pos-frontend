import axios from "axios";
import { API_BASE_URL } from "../config/constants";
import { SalePayload, SalesReportData } from "../interfaces/SalesReportData";

export const getSales = async (): Promise<SalesReportData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}sales`);
    return response.data.sales;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch sales data.");
  }
};

export const addSale = async (payload: SalePayload): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}sales`, payload);
  } catch (error) {
    console.error("Error adding sale:", error);
    throw error;
  }
};

