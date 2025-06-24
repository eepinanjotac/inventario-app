import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
})
export class ProductosFormComponent implements OnInit {
  productoForm!: FormGroup;
  id!: number | null;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    if (this.id) {
      this.cargarProducto();
    }
  }

  cargarProducto(): void {
    this.productosService.obtenerProductoPorId(this.id!).subscribe(data => {
      this.productoForm.patchValue(data);
    });
  }

  guardar(): void {
    if (this.productoForm.invalid) {
      return;
    }

    const productoData: Producto = this.productoForm.value;

    if (this.id) {
      this.productosService.actualizarProducto(this.id, productoData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'Producto actualizado correctamente',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/productos']);
        });
      });
    } else {
      this.productosService.crearProducto(productoData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'Producto creado correctamente',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/productos']);
        });
      });
    }
  }
  
  cancelar(): void {
    this.router.navigate(['/productos']);
  }
  
}