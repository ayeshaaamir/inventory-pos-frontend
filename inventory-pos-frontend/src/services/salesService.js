import { API_BASE_URL } from "../config/constants";

const API_URL = `${API_BASE_URL}/sales`;

export const fetchSales = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(
      `${API_URL}?page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();
    return data.sales;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return [];
  }
};
