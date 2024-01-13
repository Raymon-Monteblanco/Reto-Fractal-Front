import { PedidoService } from './../pedido.service';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../producto.service';
import { Productos } from '../productos';
import { Pedidos } from '../pedidos';
import { Router } from '@angular/router';

interface CarroItem {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css'],
})
export class RegistrarPedidoComponent implements OnInit {
  productoId: number;
  cantidad: number;
  producto: Productos = new Productos();
  pedido: Pedidos = new Pedidos();
  productos: Productos[];
  productosEnCarro: CarroItem[] = [];
  precioFinal: number;
  numeroProductos: number;
  fecha: Date;

  constructor(
    private productoServicio: ProductoService,
    private pedidoServicio: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos() {
    this.productoServicio.obtenerListaProductos().subscribe((dato) => {
      console.log('Datos recibidos del backend:', dato);
      this.productos = dato;
    });
  }

  agregarProductoCarro() {
    console.log('ID del producto:', this.productoId);
    console.log('Cantidad:', this.cantidad);

    if (this.productoId !== null) {
      const index = this.productosEnCarro.findIndex(
        (item) => item.id == this.productoId
      );
      if (index === -1) {
        this.productoServicio
          .obtenerProductoPorId(this.productoId)
          .subscribe((dato) => {
            this.producto = dato as Productos;

            const precioTotal = this.producto.precioUnitario * this.cantidad;

            const carroItem: CarroItem = {
              id: this.producto.id,
              nombre: this.producto.nombre,
              cantidad: this.cantidad,
              precio: precioTotal,
            };

            this.productosEnCarro.push(carroItem);
          });
      } else {
        console.log(
          'El producto ya está en el carro. No se realiza ninguna acción.'
        );
      }
    }
  }

  incrementarCantidad(index: number) {
    this.productosEnCarro[index].cantidad++;
    this.actualizarPrecioTotal(index);
  }

  decrementarCantidad(index: number) {
    if (this.productosEnCarro[index].cantidad > 1) {
      this.productosEnCarro[index].cantidad--;
      this.actualizarPrecioTotal(index);
    }
  }

  private actualizarPrecioTotal(index: number) {
    const producto = this.productosEnCarro[index];
    producto.precio = this.producto.precioUnitario * producto.cantidad;
  }

  eliminarProducto(index: number) {
    this.productosEnCarro.splice(index, 1);
  }

  obtenerMontoTotal(): number {
    return this.productosEnCarro.reduce(
      (total, item) => total + item.precio,
      0
    );
  }

  obtenerCantidadTotal(): number {
    return this.productosEnCarro.reduce(
      (total, item) => total + item.cantidad,
      0
    );
  }

  realizarPedido() {
    this.pedido.fecha = new Date();
    this.pedido.numeroProductos = this.obtenerCantidadTotal();
    this.pedido.precioFinal = this.obtenerMontoTotal();


    console.log('fecha: ', this.fecha);
    console.log('cantidad de productos: ', this.numeroProductos);
    console.log('precio final: ', this.precioFinal);

    this.pedidoServicio.agregarPedido(this.pedido).subscribe(
      (dato) => {
        console.log(dato);
        this.goListaPedidos();
      },
      (error) => console.log(error)
    );
  }


  goListaPedidos() {
    this.router.navigate(['/pedidos']);
  }
}
