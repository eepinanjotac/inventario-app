import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Transaccion } from 'src/app/models/transaccion.model';
import { Producto } from 'src/app/models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transacciones-form',
  templateUrl: './transacciones-form.component.html',
})
export class TransaccionesFormComponent implements OnInit {
  
  transaccionForm!: FormGroup;
  productos: Producto[] = [];
  id!: number | null;
  productoSearchControl = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;

    this.transaccionForm = this.fb.group({
      fecha: ['', Validators.required],
      tipo: ['compra', Validators.required],
      productoId: [0, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0.01)]],
      precioTotal: [{ value: 0, disabled: true }],
      detalle: ['']
    });

    if (this.id) {
      this.cargarTransaccion();
    }

    this.transaccionForm.get('cantidad')?.valueChanges.subscribe(() => this.calcularTotal());
    this.transaccionForm.get('precioUnitario')?.valueChanges.subscribe(() => this.calcularTotal());
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.items;
    });
  }

  cargarTransaccion(): void {
    this.transaccionesService.obtenerTransaccionPorId(this.id!).subscribe(data => {
      const fechaFormateada = data.fecha 
        ? new Date(data.fecha).toISOString().split('T')[0]
        : '';
      this.transaccionForm.patchValue({
        ...data,
        fecha: fechaFormateada
      });
      this.calcularTotal();
      this.productosService.obtenerProductoPorId(data.productoId).subscribe(producto => {
        this.productoSearchControl.setValue(producto.nombre);
      });
    });
  }

  calcularTotal(): void {
    const cantidad = this.transaccionForm.get('cantidad')?.value || 0;
    const precioUnitario = this.transaccionForm.get('precioUnitario')?.value || 0;
    this.transaccionForm.get('precioTotal')?.setValue(cantidad * precioUnitario);
  }

  guardar(): void {
    if (this.transaccionForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente.'
      });
      return;
    }

    const transaccionData: Transaccion = {
      ...this.transaccionForm.getRawValue(),
      id: this.id || 0
    };

    if (this.id) {
      this.transaccionesService.actualizarTransaccion(this.id, transaccionData).subscribe({
        next: (response: any) => {
          if (!response.exito) {
            Swal.fire({
              icon: 'warning',
              title: 'Aviso',
              text: response.mensaje,
            });
            return;
          }
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: response.mensaje || 'La transacción fue actualizada correctamente...',
          }).then(() => {
            this.router.navigate(['/transacciones']);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.error || 'Ha ocurrido un error al actualizar la transacción...',
          });
        }
      });
    } else {
      this.transaccionesService.crearTransaccion(transaccionData).subscribe({
        next: (response: any) => {
          if (!response.exito) {
            Swal.fire({
              icon: 'warning',
              title: 'Aviso',
              text: response.mensaje,
            });
            return;
          }
          Swal.fire({
            icon: 'success',
            title: '¡Creado!',
            text: response.mensaje || 'La transacción fue registrada correctamente...',
          }).then(() => {
            this.router.navigate(['/transacciones']);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.error || 'Ha ocurrido un error al crear la transacción...',
          });
        }
      });
    }
  }

  buscarProductos(): void {
    const nombre = this.productoSearchControl.value?.trim();
    if (nombre) {
      this.productosService.obtenerProductos({ nombre, pageNumber: 1, pageSize: 10 }).subscribe(data => {
        this.productos = data.items;
      });
    } else {
      this.productos = [];
      this.transaccionForm.patchValue({ productoId: 0 });
    }
  }

  seleccionarProducto(producto: Producto): void {
    this.transaccionForm.patchValue({ productoId: producto.id });
    this.productos = [];
  }

  cancelar(): void {
    this.router.navigate(['/transacciones']);
  }
  
}
