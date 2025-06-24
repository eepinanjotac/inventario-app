export interface Transaccion {
  id: number;
  fecha: string;
  tipo: 'compra' | 'venta';
  productoId: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  detalle: string;
}
