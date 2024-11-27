import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addSale } from "../../services/salesService";
import { CartItem } from "../../interfaces/SalesReportData";

const Payment: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [barcode, setBarcode] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [runningTotal, setRunningTotal] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number | null>(null);

  const handleAddToCart = () => {
    const pricePerItem = 10;
    const price = quantity * pricePerItem;

    const newCartItem = { barcode, quantity, price };
    const updatedCart = [...cart, newCartItem];

    setCart(updatedCart);
    setRunningTotal(runningTotal + price);

    setBarcode("");
    setQuantity(1);
  };

  const handleRemoveFromCart = (index: number) => {
    const removedItem = cart[index];
    const updatedCart = cart.filter((_, i) => i !== index);

    setCart(updatedCart);
    setRunningTotal(runningTotal - removedItem.price);
  };

  const handleShowBill = () => {
    setFinalTotal(runningTotal);
  };

  const handleUpdateBill = (updatedTotal: number) => {
    setFinalTotal(updatedTotal);
  };

  const handleCheckout = async () => {
    if (finalTotal === null) return;

    const discount = runningTotal - finalTotal;

    const cartData = cart.map(({ barcode, quantity }) => ({
      barcode,
      quantity,
    }));
    const payload = {
      cart: cartData,
      total: finalTotal,
      discount,
    };

    try {
      await addSale(payload);
      alert("Payment processed successfully!");
      setCart([]);
      setRunningTotal(0);
      setFinalTotal(null);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>

      <TextField
        label="Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ marginRight: "10px" }}
      />
      <Button variant="contained" onClick={handleAddToCart}>
        Add to Cart
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Barcode</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.barcode}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Running Total: £{runningTotal.toFixed(2)}
      </Typography>

      {finalTotal !== null && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Adjust Total:</Typography>
          <TextField
            type="number"
            value={finalTotal}
            onChange={(e) => handleUpdateBill(Number(e.target.value))}
          />
        </div>
      )}

      <Button
        variant="contained"
        style={{ marginTop: "20px", marginRight: "10px" }}
        onClick={handleShowBill}
      >
        Show Bill
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Payment;
