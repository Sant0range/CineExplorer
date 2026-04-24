// movie-card.component.ts
// Componente que muestra una tarjeta con la información de una película
import { Component } from '@angular/core';
// Importar la interfaz Movie que creamos en el capítulo 1
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent {
  // Por ahora usamos datos de ejemplo hardcodeados
  // En el próximo capítulo recibiremos los datos del componente padre con @Input
  pelicula: Movie = {
    id: 550,
    title: 'Fight Club',
    overview: 'Un oficinista insomne y un fabricante de jabón forman un club de pelea clandestino que evoluciona hacia algo mucho más peligroso.',
    poster_path: '/pB8BM7pdSp6B6Ih7QI4S2t0POoD.jpg',
    backdrop_path: '/hZkgoQYus5dXo3H8T7Uef6DNknx.jpg',
    vote_average: 8.4,
    release_date: '1999-10-15',
    genre_ids: [18, 53]
  };
}