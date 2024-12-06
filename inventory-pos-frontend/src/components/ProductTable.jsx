import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import useInventory from "../hooks/useInventory";
import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import generateBarcode from "../services/inventoryService";

const ProductTable = ({ onEdit, searchQuery }) => {
  const { inventory, deleteProduct } = useInventory();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const toast = useRef(null);

  const filteredInventory = inventory.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      (product.barcode && product.barcode.toLowerCase().includes(query)) ||
      (product.item_name && product.item_name.toLowerCase().includes(query)) ||
      (product.design_no && product.design_no.toLowerCase().includes(query)) ||
      (product.size && product.size.toLowerCase().includes(query)) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });

  const deleteProductHandler = () => {
    deleteProduct(productToDelete.barcode)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Product deleted successfully!",
          life: 3000,
        });
        setShowDeleteDialog(false);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error?.message || "Failed to delete product",
          life: 3000,
        });
        setShowDeleteDialog(false);
      });
  };

  const cancelDeleteHandler = () => {
    setShowDeleteDialog(false);
  };

  const generateBarcodeHandler = (product) => {
    setBarcode(product.barcode);
    setShowBarcodeModal(true);
  };

  const handleGenerateBarcodeSubmit = async () => {
    try {
      await generateBarcode.generateBarcode(barcode, quantity);
      toast.current.show({
        severity: "success",
        summary: "Barcode Generated",
        detail: `Barcode for ${barcode} printed successfully.`,
        life: 3000,
      });
      setShowBarcodeModal(false);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to generate barcode.",
        life: 3000,
      });
    }
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-info"
        onClick={() => onEdit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-danger"
        onClick={() => {
          setProductToDelete(rowData);
          setShowDeleteDialog(true);
        }}
      />
      <Button
        label="Generate Barcode"
        icon="pi pi-barcode"
        className="p-button-rounded p-button-text p-button-success"
        onClick={() => generateBarcodeHandler(rowData)}
      />
    </>
  );

  return (
    <>
      <Toast ref={toast} />

      <DataTable
        value={filteredInventory}
        paginator
        rows={10}
        className="p-datatable-sm"
      >
        <Column field="barcode" header="Barcode" />
        <Column field="item_name" header="Product Name" />
        <Column field="categoryname" header="Category" />
        <Column field="color" header="Color" />
        <Column field="design_no" header="Design Number" />
        <Column field="size" header="Size" />
        <Column field="description" header="Description" />
        <Column field="price" header="Price" />
        <Column field="stock" header="Stock" />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>

      <Dialog
        visible={showDeleteDialog}
        onHide={cancelDeleteHandler}
        header="Confirm Deletion"
        footer={
          <>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={cancelDeleteHandler}
              className="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={deleteProductHandler}
              className="p-button-danger"
            />
          </>
        }
      >
        <p>
          Are you sure you want to delete the product:{" "}
          <strong>{productToDelete?.item_name}</strong>?
        </p>
      </Dialog>

      {/* Barcode Modal */}
      <Dialog
        visible={showBarcodeModal}
        onHide={() => setShowBarcodeModal(false)}
        header="Generate Barcode"
        footer={
          <>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setShowBarcodeModal(false)}
              className="p-button-text"
            />
            <Button
              label="Generate"
              icon="pi pi-check"
              onClick={handleGenerateBarcodeSubmit}
              className="p-button-success"
            />
          </>
        }
      >
        <div className="p-field">
          <label htmlFor="barcode">Barcode</label>
          <InputText id="barcode" value={barcode} disabled />
        </div>
        <div className="p-field">
          <label htmlFor="quantity">Quantity</label>
          <InputText
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            min={1}
          />
        </div>
      </Dialog>
    </>
  );
};

ProductTable.propTypes = {
  onEdit: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default ProductTable;
