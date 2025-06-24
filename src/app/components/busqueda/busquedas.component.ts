import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto.model';
import { Transaccion } from 'src/app/models/transaccion.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
})
export class BusquedasComponent implements OnInit {

  productoSearchControl = new FormControl('');
  productos: Producto[] = [];

  productoId!: number;
  producto?: Producto;

  productosFiltrados: Producto[] = [];
  productoBuscar: string = '';

  transacciones: Transaccion[] = [];
  totalItems = 0;

  filtro = '';
  fechaInicio?: string;
  fechaFin?: string;

  pageNumber = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 15, 20];
  totalPaginas = 1;
  paginas: number[] = [];

  constructor(
    private transaccionesService: TransaccionesService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.items;
    });
  }
  
  buscarProductos(): void {
    const nombre = this.productoSearchControl.value?.trim();
    if (nombre) {
      this.productosService.obtenerProductos({ nombre, pageNumber: 1, pageSize: 10 }).subscribe(data => {
        this.productos = data.items;
      });
    } else {
      this.productos = [];
    }
  }

  seleccionarProducto(producto: Producto): void {
    this.producto = producto;
    this.productoId = producto.id; 
    this.pageNumber = 1;

    this.productoSearchControl.setValue('');
    this.productos = [];

    this.cargarTransacciones();
  }

  cargarTransacciones(): void {
    if (!this.productoId) return;

    const filtros = {
      pageNumber: this.pageNumber.toString(),
      pageSize: this.pageSize.toString(),
      tipo: this.filtro.trim(),
      fechaInicio: this.fechaInicio ? new Date(this.fechaInicio).toISOString() : undefined,
      fechaFin: this.fechaFin ? new Date(this.fechaFin).toISOString() : undefined,
      productoId: this.productoId.toString() 
    };
    this.transaccionesService.obtenerTransaccionesByProduct(filtros).subscribe(data => {
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
