import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { TransaccionesListComponent } from './components/transacciones-list/transacciones-list.component';
import { ProductosFormComponent } from './components/productos-form/productos-form.component';
import { TransaccionesFormComponent } from './components/transacciones-form/transacciones-form.component';
import { BusquedasComponent } from './components/busqueda/busquedas.component';

const routes: Routes = [
  {
    path: 'productos',
    children: [
      { path: '', component: ProductosListComponent },
      { path: 'crear', component: ProductosFormComponent },
      { path: ':id/editar', component: ProductosFormComponent  },
    ]
  },
  {
    path: 'transacciones',
    children: [
      { path: '', component: TransaccionesListComponent },
      { path: 'crear', component: TransaccionesFormComponent },
      { path: ':id/editar', component: TransaccionesFormComponent },
    ]
  },
  {
    path: 'busquedas',
    children: [
      { path: '', component: BusquedasComponent },
    ]
  },
  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
