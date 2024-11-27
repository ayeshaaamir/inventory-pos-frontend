export interface SalesReportData {
  id: number;
  sale_date: string;
  total: string;
}

export interface SalePayload {
  cart: {
    barcode: string;
    quantity: number;
  }[];
  total: number;
  discount: number;
}

export interface CartItem {
  barcode: string;
  quantity: number;
  price: number;
}
