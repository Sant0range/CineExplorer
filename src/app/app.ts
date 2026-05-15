import { Component, inject } from '@angular/core';
import { MovieCardComponent } from './components/movie-card/movie-card';
import { Movie } from './models/movie';
import { FavoritesService } from './services/favorites';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  titulo: string = 'CineExplorer';

    private favoritesService = inject(FavoritesService);

  // Array de películas de ejemplo (después vendrán de la API)
  peliculas: Movie[] = [
    {
      id: 550,
      title: 'Fight Club',
      overview: 'Un oficinista insomne y un fabricante de jabón forman un club de pelea clandestino.',
      poster_path: '/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg',
      backdrop_path: '/hZkgoQYus5dXo3H8T7Uef6DNknx.jpg',
      vote_average: 8.4,
      release_date: '1999-10-15',
      genre_ids: [18, 53]
    },
    {
      id: 680,
      title: 'Pulp Fiction',
      overview: 'Las vidas de dos sicarios, un boxeador y la esposa de un gángster se entrelazan.',
      poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
      vote_average: 8.5,
      release_date: '1994-09-10',
      genre_ids: [53, 80]
    },
    {
      id: 13,
      title: 'Forrest Gump',
      overview: 'La historia de un hombre con un coeficiente intelectual bajo que logra cosas extraordinarias.',
      poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      backdrop_path: '/7c9UVPPiTPltouxRVY6N9uugaVA.jpg',
      vote_average: 8.5,
      release_date: '1994-06-23',
      genre_ids: [35, 18, 10749]
    }
  ];

 // Ahora delega al servicio en lugar de manejar un Set local
  esFavorita(id: number): boolean {
    return this.favoritesService.esFavorita(id);
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
