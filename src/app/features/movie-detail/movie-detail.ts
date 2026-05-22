
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { TmdbService } from '../../services/tmdb';
import { FavoritesService } from '../../services/favorites';
import { MovieDetail as MovieDetailData, Credits } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './movie-detail.html'
})

export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);

  pelicula: MovieDetailData | null = null;
  creditos: Credits | null = null;
  cargando: boolean = true;
  error: string = '';

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.cargarPelicula(id);
    this.cargarCreditos(id);
  }

  cargarPelicula(id: number): void {
    this.tmdbService.obtenerDetalle(id).subscribe({
      next: (data) => {
        this.pelicula = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo cargar la película';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  cargarCreditos(id: number): void {
    this.tmdbService.obtenerCreditos(id).subscribe({
      next: (data) => {
        this.creditos = data;
        this.cdr.markForCheck();
      }
    });
  }

  get esFavorita(): boolean {
    return this.pelicula ? this.favoritesService.esFavorita(this.pelicula.id) : false;
  }

  toggleFavorito(): void {
    if (this.pelicula) {
      this.favoritesService.toggle(this.pelicula);
    }
  }
}