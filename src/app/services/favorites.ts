// favorites.service.ts
// Servicio que maneja las películas favoritas del usuario
// Al ser singleton, todos los componentes comparten los mismos favoritos
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // BehaviorSubject<Movie[]> con valor inicial: array vacío
  // Es privado: solo el servicio puede emitir nuevos valores
  private favoritasSubject = new BehaviorSubject<Movie[]>([]);

  // Observable público: los componentes se suscriben a este
  // asObservable() convierte el Subject en un Observable de solo lectura
  favoritas$: Observable<Movie[]> = this.favoritasSubject.asObservable();

  // Observable derivado: cantidad de favoritas
  // pipe(map(...)) transforma el array en su longitud
  cantidad$: Observable<number> = this.favoritas$.pipe(
    map(favs => favs.length)
  );

  agregar(movie: Movie): void {
    // .value obtiene el valor actual del BehaviorSubject
    const actuales = this.favoritasSubject.value;
    if (!actuales.find(m => m.id === movie.id)) {
      // .next() emite un nuevo valor a todos los suscriptores
      // Spread operator [...] crea un nuevo array (inmutabilidad)
      this.favoritasSubject.next([...actuales, movie]);
    }
  }

  eliminar(id: number): void {
    const nuevas = this.favoritasSubject.value.filter(m => m.id !== id);
    this.favoritasSubject.next(nuevas);
  }

  esFavorita(id: number): boolean {
    return this.favoritasSubject.value.some(m => m.id === id);
  }

  toggle(movie: Movie): void {
    if (this.esFavorita(movie.id)) {
      this.eliminar(movie.id);
    } else {
      this.agregar(movie);
    }
  }

  obtenerTodas(): Movie[] {
    return this.favoritasSubject.value;
  }

  obtenerCantidad(): number {
    return this.favoritasSubject.value.length;
  }
}