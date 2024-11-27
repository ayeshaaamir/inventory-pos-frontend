import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { getProducts } from "../../services/inventoryService";
import { ProductTableData } from "../../interfaces/productData";

const ViewProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts();
        if (Array.isArray(productData)) {
          setProducts(productData);
        } else {
          setError("Received data is not in the correct format.");
        }
        setLoading(false);
      } catch (err: unknown) {
        console.log(err);
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        View Products
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Barcode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.item_name}</TableCell>
                  <TableCell className="truncate text-ellipsis">{product.description}</TableCell>
                  <TableCell>£{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.barcode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewProducts;
