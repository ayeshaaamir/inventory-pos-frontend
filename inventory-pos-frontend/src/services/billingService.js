import axios from 'axios';
import { API_BASE_URL } from "../config/constants";

export const InventoryService = {
  async getItemByBarcode(barcode) {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/${barcode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching item details:', error);
      throw error;
    }
  }
};

export const SalesService = {
  async processSale(saleData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/sales`, saleData);
      return response.data;
    } catch (error) {
      console.error('Error processing sale:', error);
      throw error;
    }
  }
};

// Utility function to generate unique sale barcode
export const generateSaleBarcode = () => {
  return `SALE${Date.now()}`;
};