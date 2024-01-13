import { Component, OnInit } from '@angular/core';
import { Productos } from './../productos';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  producto: Productos = new Productos();
  id: number;

  constructor(
    private productoServicio: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerProductoPorId(this.id);
  }

  private obtenerProductoPorId(id: number){
    this.productoServicio.obtenerProductoPorId(id).subscribe(dato => {
      this.producto = dato as Productos
      console.log('Datos del producto: ', this.producto);
    })
  }

  onSubmit() {
    this.actualizarProducto();
  }

  private actualizarProducto() {
    this.productoServicio.actualizarProducto(this.id,this.producto).subscribe((dato) => {
      console.log(dato);
      this.goListaProductos();
    },error => console.log(error));
  }

  goListaProductos(){
    this.router.navigate(['/productos'])
  }
}
