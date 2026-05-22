// navbar.ts
// Navbar con links de navegación
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
// Operadores RxJS para el buscador
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: true,
  // ReactiveFormsModule es necesario para usar [formControl]
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);

  // FormControl para el input de búsqueda
  // Cada vez que el usuario escribe, emite el nuevo valor como Observable
  searchControl = new FormControl('');

  get cantidadFavoritas(): number {
    return this.favoritesService.obtenerCantidad();
  }

  constructor() {
    // valueChanges es un Observable que emite cada vez que el input cambia
    this.searchControl.valueChanges.pipe(
      // debounceTime(300): espera 300ms después del último tecleo
      // Si el usuario sigue escribiendo, reinicia el timer
      debounceTime(300),
      // distinctUntilChanged: solo emite si el valor es diferente al anterior
      // Evita peticiones duplicadas si el usuario borra y reescribe lo mismo
      distinctUntilChanged(),
      // filter: solo emite si el texto tiene 2+ caracteres
      // Evita buscar con textos muy cortos
      filter(term => !!term && term.length >= 2)
    ).subscribe(term => {
      // Navegar a la página de resultados con el término como query param
      this.router.navigate(['/search'], { queryParams: { q: term } });
    });
  }
}