import { ProductoService } from './../producto.service';
import { Component, OnInit } from '@angular/core';
import { Productos } from '../productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: Productos[];


  constructor(private productoServicio:ProductoService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos(){
    this.productoServicio.obtenerListaProductos().subscribe(dato => {
      console.log('Datos recibidos del backend:', dato);
      this.productos = dato;
    })
  }

  actualizarProducto(id: number) {
    this.router.navigate(['actualizar-producto',id]);
  }

  eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(dato => {
      console.log(dato);
      this.productos = this.productos.filter(producto => producto.id !== id);
    })
  }


}
