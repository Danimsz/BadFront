import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { ProductosComponent } from './productos/productos.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { CestaComponent } from './cesta/cesta.component';


const routes: Routes = [
   {path: 'inicio', component: InicioComponent},
   {path: 'registro', component: RegistroComponent},
   {path: 'productos', component: ProductosComponent},
   {path: 'aboutus', component: AboutUSComponent},
   {path: 'cesta', component: CestaComponent},
   {path: '', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
