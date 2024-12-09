import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputTextarea } from "primereact/inputtextarea";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryManagementService";
import MenuBarComponent from "../components/MenuBarComponent";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryData, setCategoryData] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = () => {
    setCategoryData({ id: null, name: "", description: "" });
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setCategoryData(category);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSaveCategory = async () => {
    try {
      const { id, name, description } = categoryData;

      if (isEditMode) {
        await updateCategory({ id, name, description });
      } else {
        await addCategory({ name, description });
      }

      fetchCategories();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchText.toLowerCase()) ||
      category.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <MenuBarComponent userRole={userRole} />

      <div className="content">
        <h2>Category Management</h2>

        <div className="search-bar">
          <Button
            label="Add Category"
            icon="pi pi-plus"
            onClick={handleAddCategory}
            style={{ width: "300px", marginBottom: "20px" }}
          />
          <InputText
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search by name or description"
            style={{ width: "300px", marginBottom: "20px" }}
            className="ml-6"
          />
        </div>

        <DataTable value={filteredCategories} paginator rows={10}>
          <Column field="name" header="Name" />
          <Column field="description" header="Description" />
          <Column
            body={(rowData) => (
              <>
                <Button
                  icon="pi pi-pencil"
                  onClick={() => handleEditCategory(rowData)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger"
                  onClick={() => handleDeleteCategory(rowData.id)}
                />
              </>
            )}
          />
        </DataTable>
      </div>

      <Dialog
        visible={isModalVisible}
        style={{ width: "450px" }}
        header={isEditMode ? "Edit Category" : "Add Category"}
        footer={
          <div>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setIsModalVisible(false)}
            />
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={handleSaveCategory}
            />
          </div>
        }
        onHide={() => setIsModalVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData({ ...categoryData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="p-field">
            <label htmlFor="description">Description</label>
            <InputTextarea
              id="description"
              value={categoryData.description}
              onChange={(e) =>
                setCategoryData({
                  ...categoryData,
                  description: e.target.value,
                })
              }
              required
              rows={3}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
