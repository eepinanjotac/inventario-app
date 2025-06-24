import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosFormComponent } from './components/productos-form/productos-form.component';
import { TransaccionesListComponent } from './components/transacciones-list/transacciones-list.component';
import { TransaccionesFormComponent } from './components/transacciones-form/transacciones-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusquedasComponent } from './components/busqueda/busquedas.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosListComponent,
    ProductosFormComponent,
    TransaccionesListComponent,
    TransaccionesFormComponent,
    BusquedasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
