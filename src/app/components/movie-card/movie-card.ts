
import { Component, input, output } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent {
  // Entrada: datos que recibe del padre (signals)
  movie = input.required<Movie>();
  esFavorita = input<boolean>(false);

  // Salida: evento que emite hacia el padre
  // output<Movie>() crea un OutputEmitterRef que emite objetos Movie
  // Reemplaza a @Output() toggleFavorito = new EventEmitter<Movie>()
  toggleFavorito = output<Movie>();

  // Método que se ejecuta al hacer click en el botón de favorito
  onToggleFavorito(): void {
    // .emit() envía el evento al padre con la película como dato
    this.toggleFavorito.emit(this.movie());
    // Notar: this.movie() con paréntesis porque es un signal
  }
}