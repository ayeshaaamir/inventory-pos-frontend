import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const API_URL_CATEGORIES = `${API_BASE_URL}/categories`;

const categoriesService = {
  getCategories: async () => {
    try {
      const response = await axios.get(API_URL_CATEGORIES);
      return response.data.categories;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default categoriesService;
