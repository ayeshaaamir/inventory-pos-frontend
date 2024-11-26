import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddEmployeeForm from "./components/Dashboard/AddEmployeeForm";
import AddProductForm from "./components/Dashboard/AddProductForm";
import ViewProducts from "./components/Dashboard/ViewProducts";
import SalesReports from "./components/Dashboard/SalesReports";
import Payment from "./components/Dashboard/Payment";
import DeleteProduct from "./components/Dashboard/DeleteProduct";
import NotFound from "./components/NotFound/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes (Accessible to specific roles only) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AddEmployeeForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AddProductForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-products"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <ViewProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales-reports"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <SalesReports />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-product"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <DeleteProduct />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
