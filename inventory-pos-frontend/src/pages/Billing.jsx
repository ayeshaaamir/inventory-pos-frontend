import { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import MenuBarComponent from "../components/MenuBarComponent";
import { InventoryService, SalesService } from "../services/billingService";
import ReceiptComponent from "../components/Receipt";
import {
  getCategories,
  getCategoryById,
} from "../services/categoryManagementService";

const Billing = () => {
  const [barcode, setBarcode] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editableTotal, setEditableTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [saleReceipt, setSaleReceipt] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryProductsDialog, setShowCategoryProductsDialog] =
    useState(false);
  const [showQuantityDialog, setShowQuantityDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityError, setQuantityError] = useState("");
  const [categoryProductSearchTerm, setCategoryProductSearchTerm] =
    useState("");
  const toastRef = useRef(null);
  const userRole = localStorage.getItem("userRole");

  const paymentMethods = [
    { label: "Cash", value: "CASH" },
    { label: "Card", value: "CARD" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const formattedCategories = response.categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryProductSearchTerm) {
      const searchTermLower = categoryProductSearchTerm.toLowerCase();

      const filtered = categoryProducts.filter((product) => {
        const itemName = product.item_name?.toLowerCase() || "";
        const barcode = product.barcode?.toLowerCase() || "";
        const designNo = product.design_no?.toLowerCase() || "";

        return (
          itemName.includes(searchTermLower) ||
          barcode.includes(searchTermLower) ||
          designNo.includes(searchTermLower)
        );
      });

      setFilteredCategoryProducts(filtered);
    } else {
      setFilteredCategoryProducts(categoryProducts);
    }
  }, [categoryProductSearchTerm, categoryProducts]);

  const handleCategoryChange = async (e) => {
    setSelectedCategory(e.value);
    try {
      const response = await getCategoryById(e.value);
      setCategoryProducts(response);
      setFilteredCategoryProducts(response);
      setCategoryProductSearchTerm("");
      setShowCategoryProductsDialog(true);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const closeCategoryProductsDialog = () => {
    setShowCategoryProductsDialog(false);
    setSelectedCategory(null);
    setCategoryProductSearchTerm("");
  };

  const openQuantityDialog = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setQuantityError("");
    setShowQuantityDialog(true);
    setShowCategoryProductsDialog(false);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, value);
    if (selectedProduct && newQuantity > selectedProduct.stock) {
      setQuantityError(`Cannot add more than ${selectedProduct.stock} items`);
    } else {
      setQuantityError("");
    }
    setQuantity(newQuantity);
  };

  const addProductWithQuantity = () => {
    if (quantityError) return;

    const newCartItem = {
      ...selectedProduct,
      quantity,
      lineTotal: selectedProduct.price * quantity,
    };

    setCartItems([...cartItems, newCartItem]);
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.lineTotal,
      newCartItem.lineTotal
    );
    setTotalPrice(newTotalPrice);
    setEditableTotal(newTotalPrice);
    setShowQuantityDialog(false);
  };

  const handleBarcodeSearch = async () => {
    try {
      const item = await InventoryService.getItemByBarcode(barcode);
      setCurrentItem(item);
    } catch (error) {
      console.log(error);
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Item not found",
      });
    }
  };

  const addToCart = () => {
    if (!currentItem) return;

    if (quantity > currentItem.stock) {
      toastRef.current.show({
        severity: "error",
        summary: "Stock Limit",
        detail: `Cannot add more than ${currentItem.stock} items to cart`,
      });
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.barcode === currentItem.barcode
    );

    let updatedCartItems;
    if (existingItemIndex > -1) {
      const existingQuantity = cartItems[existingItemIndex].quantity;
      const totalRequestedQuantity = existingQuantity + quantity;

      if (totalRequestedQuantity > currentItem.stock) {
        toastRef.current.show({
          severity: "error",
          summary: "Stock Limit",
          detail: `Cannot add more than ${currentItem.stock} items to cart`,
        });
        return;
      }

      updatedCartItems = cartItems.map((item, index) =>
        index === existingItemIndex
          ? {
              ...item,
              quantity: totalRequestedQuantity,
              lineTotal: totalRequestedQuantity * item.price,
            }
          : item
      );
    } else {
      const newCartItem = {
        ...currentItem,
        quantity,
        lineTotal: currentItem.price * quantity,
      };
      updatedCartItems = [...cartItems, newCartItem];
    }

    setCartItems(updatedCartItems);

    const newTotalPrice = updatedCartItems.reduce(
      (total, item) => total + item.lineTotal,
      0
    );
    setTotalPrice(newTotalPrice);
    setEditableTotal(newTotalPrice);

    setBarcode("");
    setCurrentItem(null);
    setQuantity(1);
  };

  const removeFromCart = (barcode) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.barcode !== barcode
    );
    setCartItems(updatedCartItems);

    const newTotalPrice = updatedCartItems.reduce(
      (total, item) => total + item.lineTotal,
      0
    );
    setTotalPrice(newTotalPrice);
    setEditableTotal(newTotalPrice);
  };

  const processCheckout = async () => {
    try {
      const discount = totalPrice - editableTotal;

      const cart = cartItems.map((item) => ({
        barcode: item.barcode,
        quantity: item.quantity,
      }));

      const formattedPaymentType =
        paymentMethod === "CASH"
          ? "Cash"
          : paymentMethod === "CARD"
          ? "Card"
          : null;

      if (!formattedPaymentType) {
        toastRef.current.show({
          severity: "error",
          summary: "Payment Error",
          detail: "Invalid payment method selected",
        });
        return;
      }

      const saleData = {
        cart,
        paymentType: formattedPaymentType,
        paidAmount: editableTotal,
        discount: discount.toFixed(2),
      };

      const receipt = await SalesService.processSale(saleData);

      const completeReceipt = {
        ...receipt,
        items: cart,
        total: totalPrice,
        paidAmount: editableTotal,
        discount: discount.toFixed(2),
        paymentType: formattedPaymentType,
        fullCartItems: cartItems,
      };

      setSaleReceipt(completeReceipt);
      setShowReceiptDialog(true);

      setCartItems([]);
      setBarcode("");
      setQuantity(1);
      setEditableTotal(0);
      setTotalPrice(0);
      setPaymentMethod(null);
    } catch (error) {
      console.error("Error processing sale:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Checkout Error",
        detail: "Failed to process sale",
      });
    }
  };

  const confirmPrint = () => {
    window.print();
    setShowReceiptDialog(false);
  };

  const deleteButtonTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={() => removeFromCart(rowData.barcode)}
      />
    );
  };

  const productItemTemplate = (product) => {
    return (
      <div
        className="border-1 surface-border border-round p-3 text-center cursor-pointer hover:bg-blue-100"
        onClick={() => openQuantityDialog(product)}
      >
        <div className="mb-2">
          <div className="text-sm text-300">
            Price: <span>£{product.price}</span>
          </div>
          <div className="text-sm text-300">
            Stock: <span>{product.stock}</span>
          </div>
          <div className="text-sm text-300">
            Barcode: <span>{product.barcode}</span>
          </div>
          <div className="text-sm text-300">
            Design no: <span>{product.design_no}</span>
          </div>
          <div className="text-sm text-300">
            Size: <span>{product.size}</span>
          </div>
          <div className="text-sm text-300">
            Color: <span>{product.color}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <MenuBarComponent userRole={userRole} />
      <Toast ref={toastRef} />

      <Card title="Point of Sale">
        <div className="grid">
          <div className="">
            <div className="grid">
              <div className="">
                <div className="p-inputgroup" style={{ width: "90%" }}>
                  <InputText
                    placeholder="Enter Barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                  />
                  <Button icon="pi pi-search" onClick={handleBarcodeSearch} />

                  <Dropdown
                    style={{ marginLeft: "30px" }}
                    value={selectedCategory}
                    options={categories}
                    onChange={handleCategoryChange}
                    placeholder="Select Category"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {currentItem && (
              <div className="mt-3">
                <h4>Product name: {currentItem.item_name}</h4>
                <h4>In stock: {currentItem.stock}</h4>
                <h4>Price: £{currentItem.price}</h4>
                <div className="p-inputgroup">
                  <Button
                    icon="pi pi-minus"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  />
                  <InputText
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="text-center"
                  />
                  <Button
                    icon="pi pi-plus"
                    onClick={() => setQuantity(quantity + 1)}
                  />
                  <Button label="Add to Cart" onClick={addToCart} />
                </div>
              </div>
            )}
          </div>

          <div className="col-12 md:col-6" style={{ marginTop: "30px" }}>
            <DataTable value={cartItems}>
              <Column field="item_name" header="Item" />
              <Column field="barcode" header="Barcode" />
              <Column field="quantity" header="Qty" />
              <Column field="price" header="Price" />
              <Column field="lineTotal" header="Total" />
              <Column body={deleteButtonTemplate} header="Action" />
            </DataTable>

            <div className="mt-3" style={{ marginTop: "20px" }}>
              <div className="flex justify-content-between">
                <span>Total:</span>
                <InputText
                  value={editableTotal}
                  onChange={(e) => {
                    const newTotal = Number(e.target.value);
                    setEditableTotal(newTotal);
                  }}
                  className="w-4rem text-right"
                />

                <span style={{ marginLeft: "15px" }}>Discount:</span>
                <span>£{(totalPrice - editableTotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-content-between mt-2">
                <span>Payment Method:</span>
                <Dropdown
                  style={{ marginTop: "12px" }}
                  value={paymentMethod}
                  options={paymentMethods}
                  onChange={(e) => setPaymentMethod(e.value)}
                  placeholder="Select Payment"
                />
              </div>
              <Button
                label="Checkout"
                className="mt-3 w-full"
                onClick={processCheckout}
                disabled={!cartItems.length || !paymentMethod}
              />
            </div>
          </div>
        </div>
      </Card>

      <Dialog
        header={`Products in ${
          selectedCategory
            ? categories.find((c) => c.value === selectedCategory)?.label
            : "Category"
        }`}
        visible={showCategoryProductsDialog}
        onHide={closeCategoryProductsDialog}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "55vw", "641px": "100vw" }}
      >
        <div className="p-inputgroup mb-3">
          <InputText
            placeholder="Search products..."
            value={categoryProductSearchTerm}
            onChange={(e) => setCategoryProductSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        {filteredCategoryProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          filteredCategoryProducts.map((product) => (
            <Card
              style={{ marginBottom: "20px", height: "220px" }}
              key={product.id}
              title={product.item_name}
            >
              <div>
                <span>{productItemTemplate(product)}</span>
              </div>
            </Card>
          ))
        )}
      </Dialog>

      <Dialog
        header="Enter Quantity"
        visible={showQuantityDialog}
        onHide={() => setShowQuantityDialog(false)}
      >
        {selectedProduct && (
          <div>
            <h4>{selectedProduct.name}</h4>
            <p>In stock: {selectedProduct.stock}</p>
            <div className="p-inputgroup">
              <Button
                icon="pi pi-minus"
                onClick={() => handleQuantityChange(quantity - 1)}
              />
              <InputText
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
              />
              <Button
                icon="pi pi-plus"
                onClick={() => handleQuantityChange(quantity + 1)}
              />
            </div>
            {quantityError && (
              <small className="p-error block mt-2">{quantityError}</small>
            )}
            <Button
              label="Add to Cart"
              onClick={addProductWithQuantity}
              disabled={!!quantityError}
              className="mt-3"
            />
          </div>
        )}
      </Dialog>

      <Dialog
        visible={showReceiptDialog}
        onHide={() => setShowReceiptDialog(false)}
        header=""
        modal
      >
        {saleReceipt && (
          <div>
            <ReceiptComponent
              receipt={saleReceipt}
              visible={showReceiptDialog}
              onHide={() => setShowReceiptDialog(false)}
            />
            <div className="mt-3 pt-10 flex justify-content-between">
              <Button label="Print Receipt" onClick={confirmPrint} />
              <Button
                label="Close"
                severity="secondary"
                onClick={() => setShowReceiptDialog(false)}
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Billing;