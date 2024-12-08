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
      resetForm();
    }
  }, [editProduct]);

  const resetForm = () => {
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
  };

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

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: successMessage,
        life: 3000,
      });

      resetForm();
      onHide();
    } catch (error) {
      console.error(error);
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
        onHide={() => {
          resetForm();
          onHide();
        }}
        header={editProduct ? "Edit Product" : "Add Product"}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="category">Category</label>
            <Dropdown
              id="category"
              value={categories.find(
                (category) => category.id === product.category_id
              )}
              options={categories}
              optionLabel="name"
              onChange={(e) =>
                setProduct({ ...product, category_id: e.value.id })
              }
              placeholder="Select Category"
            />
          </div>
          <div className="p-field">
            <label htmlFor="color">Color</label>
            <InputText
              id="color"
              value={product.color}
              onChange={(e) =>
                setProduct({ ...product, color: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Description</label>
            <InputText
              id="description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="design_no">Design No.</label>
            <InputText
              id="design_no"
              value={product.design_no}
              onChange={(e) =>
                setProduct({ ...product, design_no: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="item_name">Product Name</label>
            <InputText
              id="item_name"
              value={product.item_name}
              onChange={(e) =>
                setProduct({ ...product, item_name: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="price">Price</label>
            <InputNumber
              id="price"
              value={product.price}
              onValueChange={(e) => setProduct({ ...product, price: e.value })}
            />
          </div>
          <div className="p-field">
            <label htmlFor="size">Size</label>
            <InputText
              id="size"
              value={product.size}
              onChange={(e) => setProduct({ ...product, size: e.target.value })}
            />
          </div>
          <div className="p-field">
            <label htmlFor="stock">Stock</label>
            <InputNumber
              id="stock"
              value={product.stock}
              onValueChange={(e) => setProduct({ ...product, stock: e.value })}
            />
          </div>
          {editProduct && (
            <div className="p-field">
              <label htmlFor="barcode">Barcode</label>
              <InputText id="barcode" value={product.barcode} disabled={true} />
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
