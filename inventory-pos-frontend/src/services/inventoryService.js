import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const API_URL = `${API_BASE_URL}/inventory`;

const getInventory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addProduct = async (product) => {
  await axios.post(API_URL, product);
};

const updateProduct = async (product, barcode) => {
  return axios.put(`${API_URL}/${barcode}`, product);
};

const deleteProduct = async (barcode) => {
  return axios.delete(`${API_URL}`, {
    data: { barcode },
  });
};

const generateBarcode = async (barcode, quantity) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/barcode/print`, {
      barcode,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default {
  getInventory,
  addProduct,
  updateProduct,
  deleteProduct,
  generateBarcode
};
