import { useState, useEffect } from "react";
import inventoryService from "../services/inventoryService";
import categoriesService from "../services/categoriesService";

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchInventory = async () => {
    try {
      const data = await inventoryService.getInventory();
      setInventory(data.inventory);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
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
    try {
      await inventoryService.addProduct(product);
      setInventory((prevInventory) => [...prevInventory, product]);
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (product, barcode) => {
    try {
      await inventoryService.updateProduct(product, barcode);
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.barcode === barcode ? { ...item, ...product } : item
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (barcode) => {
    try {
      await inventoryService.deleteProduct(barcode);
      setInventory((prevInventory) =>
        prevInventory.filter((item) => item.barcode !== barcode)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
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
