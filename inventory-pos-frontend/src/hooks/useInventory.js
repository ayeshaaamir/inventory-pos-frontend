import { useState, useEffect } from "react";
import inventoryService from "../services/inventoryService";
import categoriesService from "../services/categoriesService";

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchInventory = async () => {
    const data = await inventoryService.getInventory();
    setInventory(data.inventory);
  };

  const fetchCategories = async () => {
    try {
      const categoryList = await categoriesService.getCategories();
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addProduct = async (product) => {
    await inventoryService.addProduct(product);
    fetchInventory();
  };

  const updateProduct = async (product, barcode) => {
    await inventoryService.updateProduct(product, barcode);
    fetchInventory();
  };

  const deleteProduct = async (barcode) => {
    await inventoryService.deleteProduct(barcode);
    fetchInventory();
  };

  useEffect(() => {
    fetchInventory();
    fetchCategories();
  }, []);

  return {
    inventory,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useInventory;
