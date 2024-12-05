import { useState } from "react";
import MenuBarComponent from "../components/MenuBarComponent";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const ProductManagement = () => {
  const userRole = localStorage.getItem("userRole");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const toast = useRef(null);

  const handleAddProduct = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleModalClose = (successMessage) => {
    setShowModal(false);
    if (successMessage) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: successMessage,
        life: 3000,
      });
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <MenuBarComponent userRole={userRole} />
      <div className="p-4">
        <button
          className="p-button p-button-primary mb-4 mt-6"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
        <ProductTable onEdit={handleEditProduct} refreshKey={refreshKey} />
        {showModal && (
          <AddProductModal
            visible={showModal}
            onHide={handleModalClose}
            editProduct={editProduct}
          />
        )}
      </div>
    </>
  );
};

export default ProductManagement;
