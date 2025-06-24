import { Producto } from "./producto.model";

export interface ProductosResponse {
  items: Producto[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
}
