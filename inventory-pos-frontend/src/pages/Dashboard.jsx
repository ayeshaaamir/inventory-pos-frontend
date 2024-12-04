import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { eraseCookie } from "../utils/cookieUtils";
import { Menubar } from "primereact/menubar";

const Dashboard = () => {
  const navigate = useNavigate();

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
      label: "Settings",
      icon: "pi pi-cog",
      command: () => navigate("/settings"),
    },
  ];

  return (
    <div className="dashboard-container">
      <Menubar
        model={menuItems}
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
          <div style={{ height: "400px", width: "100%" }}>
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
