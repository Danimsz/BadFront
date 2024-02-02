import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  fotosPequenas: string[] = [
    'assets/images/4.jpeg',
    'assets/images/6.jpeg',
    'assets/images/1.jpeg',
    'assets/images/5.jpeg',
    // Podeis poner más imagenes aqui si quereis y aparecen más en la barra de imagenes pequeñas
  ];
}
  