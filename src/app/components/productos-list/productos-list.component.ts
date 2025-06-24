import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
})
export class ProductosListComponent implements OnInit {

  productos: Producto[] = [];

  totalItems = 0;
  filtro = '';
  pageNumber = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 15, 20];
  totalPaginas = 1;
  paginas: number[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    const filtros = {
      pageNumber: this.pageNumber.toString(),
      pageSize: this.pageSize.toString(),
      nombre: this.filtro.trim()
    };
    this.productosService.obtenerProductos(filtros).subscribe(data => {
      this.productos = data.items;
      this.totalItems = data.totalItems;

      this.totalPaginas = Math.ceil(this.totalItems / this.pageSize);
      this.paginas = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);
    });
  }

  eliminarProducto(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El producto fue eliminado correctamente',
            confirmButtonText: 'OK'
          });
          this.cargarProductos();
        });
      }
    });
  }

  cambiarPagina(page: number): void {
    if (page < 1 || page > this.totalPaginas) return;
    this.pageNumber = page;
    this.cargarProductos();
  }

  onPageSizeChange(): void {
    this.pageNumber = 1;
    this.cargarProductos();
  }

  aplicarFiltro(): void {
    this.pageNumber = 1;
    this.cargarProductos();
  }

  mostrarDesde(): number {
    return this.totalItems === 0 ? 0 : (this.pageNumber - 1) * this.pageSize + 1;
  }

  mostrarHasta(): number {
    const max = this.pageNumber * this.pageSize;
    return max > this.totalItems ? this.totalItems : max;
  }

}
