import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from './productos';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private baseUrl = 'http://localhost:8080/api/v1/productos';

  constructor(private httpClient: HttpClient) {}

  obtenerListaProductos(): Observable<Productos[]> {
    return this.httpClient.get<Productos[]>(`${this.baseUrl}`);
  }

  guardarProducto(producto: Productos): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, producto);
  }

  actualizarProducto(id:number, producto:Productos): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, producto);
  }

  eliminarProducto(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  obtenerProductoPorId(id:number): Observable<Object>{
    return this.httpClient.get(`${this.baseUrl}/${id}`)
  }


}
