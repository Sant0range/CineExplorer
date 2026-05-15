// navbar.ts
// Navbar con links de navegación
import { Component, inject } from '@angular/core';
// RouterLink reemplaza href para navegación sin recarga
// RouterLinkActive agrega una clase CSS cuando la ruta coincide
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // Importar RouterLink y RouterLinkActive para usarlos en el template
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  // Inyectar el servicio de favoritos para mostrar el contador
  private favoritesService = inject(FavoritesService);

  // Getter que retorna la cantidad de favoritas
  get cantidadFavoritas(): number {
    return this.favoritesService.obtenerCantidad();
  }
}