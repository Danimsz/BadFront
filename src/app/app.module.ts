import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { ProductosComponent } from './productos/productos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutUSComponent } from './about-us/about-us.component';

import { HttpClientModule } from '@angular/common/http';
import { CestaComponent } from './cesta/cesta.component';
import { DetallesproductoComponent } from './detallesproducto/detallesproducto.component';
import { ConfirmacionCompraComponent } from './confirmacion-compra/confirmacion-compra.component';
import { EthPipe } from './eth.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    RegistroComponent,
    ProductosComponent,
    AboutUSComponent,
    CestaComponent,
    DetallesproductoComponent,
    ConfirmacionCompraComponent,
    EthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
