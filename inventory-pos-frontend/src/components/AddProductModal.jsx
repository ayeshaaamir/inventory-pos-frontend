import { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import PropTypes from "prop-types";
import useInventory from "../hooks/useInventory";

const AddProductModal = ({ visible, onHide, editProduct }) => {
  const { addProduct, updateProduct, categories } = useInventory();
  const [product, setProduct] = useState({
    color: "",
    description: "",
    design_no: "",
    item_name: "",
    price: "",
    size: "",
    stock: "",
    barcode: "",
    category_id: null,
  });

  const toast = useRef(null);

  useEffect(() => {
    if (editProduct) {
      setProduct({
        ...editProduct,
        category_id: editProduct.category_id || null,
      });
    } else {
      setProduct({
        color: "",
        description: "",
        design_no: "",
        item_name: "",
        price: "",
        size: "",
        stock: "",
        barcode: "",
        category_id: null,
      });
    }
  }, [editProduct]);

  const handleSave = async () => {
    const payload = {
      color: product.color,
      description: product.description,
      design_no: product.design_no,
      item_name: product.item_name,
      price: product.price,
      size: product.size,
      stock: product.stock,
      category_id: product.category_id,
    };

    const successMessage = editProduct
      ? "Product updated successfully!"
      : "Product added successfully!";

    try {
      if (editProduct) {
        await updateProduct(payload, product.barcode);
      } else {
        await addProduct(payload);
      }
      onHide();

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: successMessage,
        life: 3000,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: editProduct
          ? "Failed to update product"
          : "Failed to add product",
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        visible={visible}
        onHide={onHide}
        header={editProduct ? "Edit Product" : "Add Product"}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label>Category</label>
            <Dropdown
              value={categories.find(
                (category) => category.id === product.category_id
              )}
              options={categories}
              optionLabel="name"
              onChange={(e) =>
                setProduct({ ...product, category_id: e.value.id })
              }
              placeholder="Select Category"
              required
            />
          </div>
          <div className="p-field">
            <label>Color</label>
            <InputText
              value={product.color}
              onChange={(e) =>
                setProduct({ ...product, color: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label>Description</label>
            <InputText
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label>Design No.</label>
            <InputText
              value={product.design_no}
              onChange={(e) =>
                setProduct({ ...product, design_no: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label>Product Name</label>
            <InputText
              value={product.item_name}
              onChange={(e) =>
                setProduct({ ...product, item_name: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label>Price</label>
            <InputNumber
              value={product.price}
              onValueChange={(e) => setProduct({ ...product, price: e.value })}
            />
          </div>
          <div className="p-field">
            <label>Size</label>
            <InputText
              value={product.size}
              onChange={(e) => setProduct({ ...product, size: e.target.value })}
            />
          </div>
          <div className="p-field">
            <label>Stock</label>
            <InputNumber
              value={product.stock}
              onValueChange={(e) => setProduct({ ...product, stock: e.value })}
            />
          </div>
          {editProduct && (
            <div className="p-field">
              <label>Barcode</label>
              <InputText value={product.barcode} disabled={true} />
            </div>
          )}
        </div>
        <Button
          label={editProduct ? "Update" : "Save"}
          onClick={handleSave}
          className="p-button-primary mt-3"
        />
      </Dialog>
    </>
  );
};

AddProductModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  editProduct: PropTypes.object,
};

export default AddProductModal;
