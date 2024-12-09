import { API_BASE_URL } from "../config/constants";
import axios from "axios";

const API_URL = `${API_BASE_URL}/categories`;

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (categoryData) => {
  try {
    const { id, name, description } = categoryData;
    const response = await axios.put(`${API_URL}`, { id, name, description });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/inventory/categoryid/${categoryId}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
};
