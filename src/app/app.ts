// app.ts
// Componente raíz: contiene el navbar y el router-outlet
import { Component } from '@angular/core';
// RouterOutlet es necesario para que <router-outlet> funcione
import { RouterOutlet } from '@angular/router';
// Importar el navbar
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  // Importar RouterOutlet y Navbar
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}