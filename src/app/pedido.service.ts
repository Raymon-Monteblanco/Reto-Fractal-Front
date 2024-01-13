import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedidos } from './pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = "http://localhost:8080/api/v1/pedidos";

  constructor(private httpClient : HttpClient) { }

  obtenerListaPedidos(): Observable<Pedidos[]>{
    return this.httpClient.get<Pedidos[]>(this.baseUrl);
  }

  agregarPedido(pedido: Pedidos): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, pedido);
  }

}
