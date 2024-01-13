import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../pedidos';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidos: Pedidos[];

  constructor(private pedidoServicio:PedidoService) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  private obtenerPedidos(){
    this.pedidoServicio.obtenerListaPedidos().subscribe(dato => {
      console.log('Datos recibidos del backend:', dato);
      this.pedidos = dato;
    })
  }
}
