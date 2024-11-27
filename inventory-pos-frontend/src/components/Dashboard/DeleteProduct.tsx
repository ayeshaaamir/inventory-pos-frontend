import React, { useState } from "react";
import { Button, Snackbar, Box, TextField, Typography } from "@mui/material";
import { deleteProduct } from "../../services/inventoryService";
import { useNavigate } from "react-router-dom";

const DeleteProduct: React.FC = () => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await deleteProduct({ barcode });
      setLoading(false);
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: unknown) {
      setLoading(false);

      if (err instanceof Error) {
        setError(err.message || "Failed to delete the product.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4">Delete Product</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Product"}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message="Product deleted successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: "green",
            color: "white",
          },
        }}
      />
    </Box>
  );
};

export default DeleteProduct;
