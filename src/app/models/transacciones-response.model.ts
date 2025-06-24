import { Transaccion } from './transaccion.model';

export interface TransaccionesResponse {
  items: Transaccion[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
}
