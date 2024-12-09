import { Chart } from "primereact/chart";
import MenuBarComponent from "../components/MenuBarComponent";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../styles/dashboard.css";

const Dashboard = () => {
  const userRole = localStorage.getItem("userRole");

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

  const transactions = [
    { id: 1, name: "John Doe", date: "2024-12-01", amount: "$150" },
    { id: 2, name: "Jane Smith", date: "2024-12-02", amount: "$250" },
    { id: 3, name: "Paul Brown", date: "2024-12-03", amount: "$400" },
    { id: 4, name: "Lisa Taylor", date: "2024-12-04", amount: "$120" },
  ];

  return (
    <div className="dashboard-container">
      <MenuBarComponent userRole={userRole} />

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
