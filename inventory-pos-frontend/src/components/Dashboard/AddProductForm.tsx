import React, { useState } from "react";
import { TextField, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../../interfaces/productData";
import { addProduct } from "../../services/inventoryService";

const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductData>({
    item_name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await addProduct(formData);
      setLoading(false);

      setSnackbarMessage("Product added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: unknown) {
      setLoading(false);

      if (err instanceof Error) {
        setError(err.message);
        setSnackbarMessage(err.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } else {
        const genericError = "An unexpected error occurred.";
        setError(genericError);
        setSnackbarMessage(genericError);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Stock"
          variant="outlined"
          fullWidth
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Box className="mt-4">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductForm;
