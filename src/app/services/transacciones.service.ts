import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';
import { TransaccionesResponse } from '../models/transacciones-response.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private apiUrl = 'http://localhost:5270/api/transacciones';

  constructor(private http: HttpClient) {}

  obtenerTransacciones(filtros: any): Observable<TransaccionesResponse> {
    let params = new HttpParams();
    if (filtros) {
      Object.keys(filtros).forEach((key) => {
        if (filtros[key]) {
          params = params.append(key, filtros[key]);
        }
      });
    }
    return this.http.get<TransaccionesResponse>(this.apiUrl, { params });
  }

  obtenerTransaccionesByProduct(filtros: any): Observable<TransaccionesResponse> {
    let params = new HttpParams();
    if (filtros) {
      Object.keys(filtros).forEach((key) => {
        if (filtros[key]) {
          params = params.append(key, filtros[key]);
        }
      });
    }
    return this.http.get<TransaccionesResponse>(`${this.apiUrl}/ByProducto`, { params });
  }

  obtenerTransaccionPorId(id: number): Observable<Transaccion> {
    return this.http.get<Transaccion>(`${this.apiUrl}/${id}`);
  }

  crearTransaccion(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.apiUrl, transaccion);
  }

  actualizarTransaccion(id: number, transaccion: Transaccion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, transaccion);
  }

  eliminarTransaccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}