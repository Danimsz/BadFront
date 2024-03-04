import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { ProductosComponent } from './productos/productos.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { CestaComponent } from './cesta/cesta.component';
import { ConfirmacionCompraComponent } from './confirmacion-compra/confirmacion-compra.component';
import { DetallesproductoComponent } from './detallesproducto/detallesproducto.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministradorProductosComponent } from './administrador-productos/administrador-productos.component';
import { AdministradorDetallesproductoComponent } from './administrador-detallesproducto/administrador-detallesproducto.component';
import { AdministradorUsuariosComponent } from './administrador-usuarios/administrador-usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';



const routes: Routes = [
   {path: 'inicio', component: InicioComponent},
   {path: 'registro', component: RegistroComponent},
   {path: 'productos', component: ProductosComponent},
   {path: 'aboutus', component: AboutUSComponent},
   {path: 'cesta', component: CestaComponent},
   {path: 'confirmacion-compra', component: ConfirmacionCompraComponent},
   {path: 'detalles/:id', component: DetallesproductoComponent},
   {path: 'administrador', component: AdministradorComponent},
   {path: 'administrador-productos', component: AdministradorProductosComponent},
   {path: 'administrador-detallesproducto/:id', component: AdministradorDetallesproductoComponent },
   {path: 'administrador-detallesproducto', component: AdministradorDetallesproductoComponent },
   {path: 'administrador-usuarios', component: AdministradorUsuariosComponent},
   {path: 'usuario', component: UsuarioComponent},
   {path: '', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
