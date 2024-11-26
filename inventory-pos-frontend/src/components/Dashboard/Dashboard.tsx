import { useEffect, useState } from "react";
import { Button, Typography, Box, Paper, Grid } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<number | null>(null);

  useEffect(() => {
    const role = Cookies.get("userRole");
    setUserRole(role ? parseInt(role, 10) : null);
  }, []);

  const handleLogout = () => {
    Cookies.remove("userRole");
    navigate("/login");
  };

  const handleNavigateToAnotherPage = (url: string) => {
    navigate(url);
  };

  return (
    <Box className="p-6">
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>

      <Grid container spacing={3} className="mt-6">
        {userRole === 1 && (
          <>
            <Grid item xs={12} md={4}>
              <Paper className="cursor-pointer p-4">
                <Typography
                  onClick={() => handleNavigateToAnotherPage("/add-employee")}
                  variant="h6"
                >
                  Add New Employee
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className="cursor-pointer p-4">
                <Typography
                  onClick={() => handleNavigateToAnotherPage("/add-product")}
                  variant="h6"
                >
                  Add Product
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className="cursor-pointer p-4">
                <Typography
                  onClick={() => handleNavigateToAnotherPage("/sales-reports")}
                  variant="h6"
                >
                  View Sales Reports
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className="cursor-pointer p-4">
                <Typography
                  onClick={() => handleNavigateToAnotherPage("/delete-product")}
                  variant="h6"
                >
                  Delete Product
                </Typography>
              </Paper>
            </Grid>
          </>
        )}

        <Grid item xs={12} md={4}>
          <Paper className="cursor-pointer p-4">
            <Typography
              onClick={() => handleNavigateToAnotherPage("/payment")}
              variant="h6"
            >
              Payment
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="cursor-pointer p-4">
            <Typography
              onClick={() => handleNavigateToAnotherPage("/view-products")}
              variant="h6"
            >
              View Products
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
