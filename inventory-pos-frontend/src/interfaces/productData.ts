export interface ProductData {
  item_name: string;
  description: string;
  price: number;
  stock: number;
}

export interface DeleteProductData {
  barcode: string
}

export interface ProductTableData {
  id: string;
  item_name: string;
  description: string;
  price: number;
  stock: number;
  barcode: string;
}
