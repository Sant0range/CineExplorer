// favorites.service.ts
// Servicio que maneja las películas favoritas del usuario
// Al ser singleton, todos los componentes comparten los mismos favoritos
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // Array privado de películas favoritas
  // "private" impide que los componentes modifiquen el array directamente
  private favoritas: Movie[] = [];

  // Retorna una copia del array (para evitar mutación externa)
  // El spread operator [...] crea un nuevo array con los mismos elementos
  obtenerTodas(): Movie[] {
    return [...this.favoritas];
  }

  // Agrega una película a favoritos si no está ya
  agregar(movie: Movie): void {
    // .find() busca un elemento que cumpla la condición
    // Si no lo encuentra, retorna undefined
    if (!this.favoritas.find(m => m.id === movie.id)) {
      this.favoritas.push(movie);
    }
  }

  // Elimina una película de favoritos por su ID
  eliminar(id: number): void {
    // .filter() crea un nuevo array sin el elemento eliminado
    this.favoritas = this.favoritas.filter(m => m.id !== id);
  }

  // Verifica si una película es favorita
  esFavorita(id: number): boolean {
    // .some() retorna true si al menos un elemento cumple la condición
    return this.favoritas.some(m => m.id === id);
  }

  // Alterna el estado de favorito (agrega si no está, quita si está)
  toggle(movie: Movie): void {
    if (this.esFavorita(movie.id)) {
      this.eliminar(movie.id);
    } else {
      this.agregar(movie);
    }
  }

  // Retorna la cantidad de favoritas
  obtenerCantidad(): number {
    return this.favoritas.length;
  }
}