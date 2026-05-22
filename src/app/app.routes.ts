// app.routes.ts
// Definición de todas las rutas de la aplicación
import { Routes } from '@angular/router';

// Importar los componentes de cada página
import { Home } from './features/home/home';

// Routes es un array de objetos que mapean URLs a componentes
export const routes: Routes = [
  // Ruta raíz: muestra Home cuando la URL es "/"
  { path: '', component: Home },

  // Ruta con parámetro dinámico: :id se reemplaza por el ID real
  // /movie/550 → MovieDetail con params['id'] = '550'
  {
    path: 'movie/:id',
    // loadComponent: lazy loading — solo carga el código cuando se visita la ruta
    // Mejora el tiempo de carga inicial de la app
    loadComponent: () =>
      import('./features/movie-detail/movie-detail')
        .then(m => m.MovieDetail)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search-results/search-results')
        .then(m => m.SearchResults)
  },

 
  // Ruta de favoritos
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites')
        .then(m => m.Favorites)
  },

  // Ruta wildcard: cualquier URL no definida redirige al inicio
  // DEBE ir al final del array (Angular evalúa en orden)
  { path: '**', redirectTo: '' }
];