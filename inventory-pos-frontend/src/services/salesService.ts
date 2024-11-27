import axios from "axios";
import { API_BASE_URL } from "../config/constants";
import { SalesReportData } from "../interfaces/SalesReportData";

export const getSales = async (): Promise<SalesReportData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}sales`);
    return response.data.sales;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch sales data.");
  }
};
