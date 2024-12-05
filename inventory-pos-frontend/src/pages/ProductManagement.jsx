import { useState } from "react";
import MenuBarComponent from "../components/MenuBarComponent";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";

const ProductManagement = () => {
  const userRole = localStorage.getItem("userRole");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  return (
    <>
      <MenuBarComponent userRole={userRole} />
      <div className="p-4">
        <button
          className="p-button p-button-primary mb-4 mt-6"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
        <ProductTable onEdit={handleEditProduct} />
        {showModal && (
          <AddProductModal
            visible={showModal}
            onHide={() => setShowModal(false)}
            editProduct={editProduct}
          />
        )}
      </div>
    </>
  );
};

export default ProductManagement;
