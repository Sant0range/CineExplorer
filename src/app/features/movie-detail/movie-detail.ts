// movie-detail.ts
// Página de detalle que lee el parámetro :id de la URL
import { Component, OnInit, inject } from '@angular/core';
// ActivatedRoute da acceso a los parámetros de la ruta actual
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail.html'
})
export class MovieDetail implements OnInit {
  // ActivatedRoute contiene información de la ruta actual
  private route = inject(ActivatedRoute);

  // ID de la película (se lee de la URL)
  movieId: number = 0;

  ngOnInit(): void {
    // snapshot.params contiene los parámetros de la ruta
    // params['id'] corresponde al :id definido en app.routes.ts
    // El "+" convierte el string a número
    this.movieId = +this.route.snapshot.params['id'];
    console.log('ID de la película:', this.movieId);
    // En el capítulo 6 usaremos este ID para llamar a la API
  }
}