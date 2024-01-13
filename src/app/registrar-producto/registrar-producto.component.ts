import { Component, OnInit } from '@angular/core';
import { Productos } from './../productos';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css'],
})
export class RegistrarProductoComponent implements OnInit {
  producto: Productos = new Productos();
  constructor(
    private productoServicio: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.producto);
  }

  saveProducto() {
    this.productoServicio.guardarProducto(this.producto).subscribe((dato) => {
      console.log(dato);
      this.goListaProductos();
    },error => console.log(error));
  }

  goListaProductos(){
    this.router.navigate(['/productos'])
  }

  onSubmit() {
    this.saveProducto();
  }
}
