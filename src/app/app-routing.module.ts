import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { RegistrarPedidoComponent } from './registrar-pedido/registrar-pedido.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';

const routes: Routes = [
  {path : 'pedidos', component:ListaPedidosComponent},
  {path : '',redirectTo: 'pedidos',pathMatch: 'full'},
  {path : 'registrar-pedido',component : RegistrarPedidoComponent},
  {path : 'productos', component:ListaProductosComponent},
  {path : 'registrar-producto', component : RegistrarProductoComponent},
  {path : 'actualizar-producto/:id', component :ActualizarProductoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
