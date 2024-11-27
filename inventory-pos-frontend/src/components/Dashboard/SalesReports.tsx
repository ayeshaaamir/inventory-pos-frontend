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
import { getSales } from "../../services/salesService";
import { SalesReportData } from "../../interfaces/SalesReportData";

const SalesReports: React.FC = () => {
  const [sales, setSales] = useState<SalesReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesData = await getSales();
        if (Array.isArray(salesData)) {
          setSales(salesData);
        } else {
          setError("Received data is not in the correct format.");
        }
        setLoading(false);
      } catch (err: unknown) {
        console.log(err);
        setError("Failed to fetch sales data.");
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Sales Reports
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sale ID</TableCell>
                <TableCell>Sale Date</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>
                    {new Date(sale.sale_date).toLocaleString()}
                  </TableCell>
                  <TableCell>£{sale.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default SalesReports;
