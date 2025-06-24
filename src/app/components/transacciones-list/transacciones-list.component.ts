import { Component, OnInit } from "@angular/core";
import { Transaccion } from "src/app/models/transaccion.model";
import { ProductosService } from "src/app/services/productos.service";
import { TransaccionesService } from "src/app/services/transacciones.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transacciones-list',
  templateUrl: './transacciones-list.component.html',
})
export class TransaccionesListComponent implements OnInit {

  transacciones: Transaccion[] = [];

  totalItems = 0;
  filtro = '';
  pageNumber = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 15, 20];
  totalPaginas = 1;
  paginas: number[] = [];

  constructor(
    private transaccionesService: TransaccionesService,
    private productosService: ProductosService,
  ) {}

  ngOnInit(): void {
    this.cargarTransacciones();
  }

  cargarTransacciones(): void {
    const filtros = {
      pageNumber: this.pageNumber.toString(),
      pageSize: this.pageSize.toString(),
      tipo: this.filtro.trim()
    };

    this.transaccionesService.obtenerTransacciones(filtros).subscribe(data => {
      this.transacciones = data.items;
      this.totalItems = data.totalItems;

      this.transacciones.forEach(transaccion => {
        this.obtenerNombreProducto(transaccion);
      });

      this.totalPaginas = Math.ceil(this.totalItems / this.pageSize);
      this.paginas = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);
    });
  }

  private obtenerNombreProducto(transaccion: Transaccion): void {
    this.productosService.obtenerProductoPorId(transaccion.productoId).subscribe(producto => {
      transaccion.nombreProducto = producto.nombre;
    });
  }

  eliminarTransaccion(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.transaccionesService.eliminarTransaccion(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'La transacción fue eliminada correctamente',
            confirmButtonText: 'OK'
          });
          this.cargarTransacciones();
        });
      }
    });
  }

  cambiarPagina(page: number): void {
    if (page < 1 || page > this.totalPaginas) return;
    this.pageNumber = page;
    this.cargarTransacciones();
  }

  onPageSizeChange(): void {
    this.pageNumber = 1;
    this.cargarTransacciones();
  }

  aplicarFiltro(): void {
    this.pageNumber = 1;
    this.cargarTransacciones();
  }

  mostrarDesde(): number {
    return this.totalItems === 0 ? 0 : (this.pageNumber - 1) * this.pageSize + 1;
  }

  mostrarHasta(): number {
    const max = this.pageNumber * this.pageSize;
    return max > this.totalItems ? this.totalItems : max;
  }

}
