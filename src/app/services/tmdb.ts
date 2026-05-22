// tmdb.service.ts
// Servicio que consume la API de TMDB para obtener datos de películas
import { Injectable, inject } from '@angular/core';
// HttpClient es el cliente HTTP de Angular
import { HttpClient } from '@angular/common/http';
// Observable es el tipo de retorno de las peticiones HTTP en Angular
import { Observable, catchError, throwError } from 'rxjs';
// Importar las interfaces que creamos en el capítulo 1
import { Movie, MovieResponse, MovieDetail, Credits, Genre } from '../models/movie';


@Injectable({ providedIn: 'root' })
export class TmdbService {
  // Inyectar HttpClient
  private http = inject(HttpClient);

  // URL base de la API de TMDB
  private apiUrl = 'https://api.themoviedb.org/3';

  // Obtener películas populares
  // Retorna un Observable<MovieResponse> — se suscribe desde el componente
  obtenerPopulares(page: number = 1): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(
    `${this.apiUrl}/movie/popular`,
    { params: { language: 'es-ES', page: page.toString() } }
  ).pipe(
    // catchError intercepta errores antes de que lleguen al componente
    catchError(error => {
      console.error('Error HTTP:', error);

      // Retornar un error más descriptivo según el código HTTP
      if (error.status === 0) {
        return throwError(() => new Error('Sin conexión a internet'));
      }
      if (error.status === 401) {
        return throwError(() => new Error('API key inválida'));
      }
      if (error.status === 404) {
        return throwError(() => new Error('Recurso no encontrado'));
      }

      return throwError(() => new Error('Error del servidor'));
    })
  );
}


  // Obtener películas mejor valoradas
  obtenerTopRated(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/top_rated`,
      {
        params: { language: 'es-ES', page: page.toString() }
      }
    );
  }

  // Obtener detalle completo de una película por su ID
  obtenerDetalle(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.apiUrl}/movie/${id}`,
      {
        params: { language: 'es-ES' }
      }
    );
  }

  // Buscar películas por texto
  buscar(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/search/movie`,
      {
        params: {
          query: query,             // texto de búsqueda
          language: 'es-ES',
          page: page.toString()
        }
      }
    );
  }

  // Obtener créditos (reparto) de una película
  obtenerCreditos(id: number): Observable<Credits> {
    return this.http.get<Credits>(
      `${this.apiUrl}/movie/${id}/credits`,
      { params: {} }
    );
  }

  // Obtener lista de géneros
  obtenerGeneros(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(
      `${this.apiUrl}/genre/movie/list`,
      {
        params: { language: 'es-ES' }
      }
    );
  }
  
}
