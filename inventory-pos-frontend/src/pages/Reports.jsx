import { useEffect, useState, useRef } from "react";
import MenuBarComponent from "../components/MenuBarComponent";
import { fetchSales } from "../services/salesService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { formatCurrency, formatValue } from "../utils/reportsUtils";

const Reports = () => {
  const userRole = localStorage.getItem("userRole");
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;
  const toast = useRef(null);

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        setLoading(true);
        const salesData = await fetchSales(page, pageSize);
        setSales(salesData);
        filterSales(searchQuery, salesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to load sales data",
          life: 3000,
        });
        setLoading(false);
      }
    };
    loadSalesData();
  }, [page]);

  const filterSales = (query, dataToFilter) => {
    if (!query) {
      setFilteredSales(dataToFilter);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = dataToFilter.filter((sale) => {
      return (
        (sale.barcode &&
          sale.barcode.toString().toLowerCase().includes(lowercaseQuery)) ||
        (sale.payment_type &&
          sale.payment_type
            .toString()
            .toLowerCase()
            .includes(lowercaseQuery)) ||
        (sale.total &&
          sale.total.toString().toLowerCase().includes(lowercaseQuery)) ||
        (sale.discount &&
          sale.discount.toString().toLowerCase().includes(lowercaseQuery)) ||
        (sale.paid_amount &&
          sale.paid_amount.toString().toLowerCase().includes(lowercaseQuery)) ||
        (sale.payment_date &&
          sale.payment_date.toString().toLowerCase().includes(lowercaseQuery))
      );
    });

    setFilteredSales(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterSales(query, sales);
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-info-circle"
        className="p-button-rounded p-button-text p-button-info"
        onClick={() => {
          toast.current.show({
            severity: "info",
            summary: "Sale Details",
            detail: `Sale ID: ${formatValue(
              rowData.id
            )} | Barcode: ${formatValue(rowData.barcode)}`,
            life: 3000,
          });
        }}
      />
    </>
  );

  return (
    <>
      <MenuBarComponent userRole={userRole} />
      <h2>Sales Report</h2>
      <Toast ref={toast} />
      <div className="p-4">
        <div className="p-field mb-3">
          <span className="p-input-icon-left w-full">
            <InputText
              className="w-full"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Sales..."
            />
          </span>
        </div>

        <DataTable
          value={filteredSales}
          paginator
          rows={pageSize}
          first={(page - 1) * pageSize}
          onPage={(e) => setPage(e.page + 1)}
          loading={loading}
          className="p-datatable-sm"
          emptyMessage="No sales found"
        >
          <Column
            field="barcode"
            header="Barcode"
            body={(rowData) => formatValue(rowData.barcode)}
          />
          <Column
            field="total"
            header="Total"
            body={(rowData) => formatCurrency(rowData.total)}
          />
          <Column
            field="discount"
            header="Discount"
            body={(rowData) => formatCurrency(rowData.discount)}
          />
          <Column
            field="payment_type"
            header="Payment Type"
            body={(rowData) => formatValue(rowData.payment_type)}
          />
          <Column
            field="paid_amount"
            header="Paid Amount"
            body={(rowData) => formatCurrency(rowData.paid_amount)}
          />
          <Column
            field="payment_date"
            header="Payment Date"
            body={(rowData) =>
              rowData.payment_date
                ? new Date(rowData.payment_date).toLocaleString()
                : "N/A"
            }
          />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </>
  );
};

export default Reports;
