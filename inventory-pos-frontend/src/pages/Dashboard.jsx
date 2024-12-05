import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { eraseCookie } from "../utils/cookieUtils";
import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    eraseCookie("token");
    eraseCookie("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "#42A5F5",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/dashboard"),
    },
    {
      label: "Product Management",
      icon: "pi pi-cog",
      command: () => navigate("/product-management"),
      visible: userRole !== "employee",
    },
    {
      label: "Category Management",
      icon: "pi pi-th-large",
      command: () => navigate("/category-management"),
      visible: userRole !== "employee",
    },
    {
      label: "Add Employee",
      icon: "pi pi-user-plus",
      command: () => navigate("/add-employee"),
      visible: userRole !== "employee",
    },
    {
      label: "Reports",
      icon: "pi pi-chart-bar",
      command: () => navigate("/reports"),
      visible: userRole !== "employee",
    },
    {
      label: "Billing",
      icon: "pi pi-wallet",
      command: () => navigate("/billing"),
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.visible !== false);

  const transactions = [
    { id: 1, name: "John Doe", date: "2024-12-01", amount: "$150" },
    { id: 2, name: "Jane Smith", date: "2024-12-02", amount: "$250" },
    { id: 3, name: "Paul Brown", date: "2024-12-03", amount: "$400" },
    { id: 4, name: "Lisa Taylor", date: "2024-12-04", amount: "$120" },
  ];

  return (
    <div className="dashboard-container">
      <Menubar
        model={filteredMenuItems}
        end={
          <Button
            label="Logout"
            icon="pi pi-power-off"
            onClick={handleLogout}
          />
        }
      />

      <div className="content">
        <div className="chart-container">
          <h2>Sales Overview</h2>
          <div style={{ width: "100%" }}>
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="transactions-container">
          <h2>Recent Transactions</h2>
          <DataTable value={transactions} stripedRows responsiveLayout="scroll">
            <Column field="name" header="Customer Name" />
            <Column field="date" header="Date" />
            <Column field="amount" header="Amount" />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
