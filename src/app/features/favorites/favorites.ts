// favorites.ts
// Página que muestra las películas marcadas como favoritas
import { Component, inject } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { FavoritesService } from '../../services/favorites';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './favorites.html'
})
export class Favorites {
  private favoritesService = inject(FavoritesService);

  // Obtener las películas favoritas del servicio
  get favoritas(): Movie[] {
    return this.favoritesService.obtenerTodas();
  }

  // Quitar de favoritos
  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}