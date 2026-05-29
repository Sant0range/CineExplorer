// tmdb-image.pipe.ts
// Pipe que construye la URL completa de una imagen de TMDB
// TMDB devuelve rutas relativas como "/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg"
// Este pipe las convierte en URLs completas
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmdbImage',
  standalone: true
})
export class TmdbImagePipe implements PipeTransform {
  // URL base de las imágenes de TMDB
  private baseUrl = 'https://image.tmdb.org/t/p/';

  // path: ruta relativa de la imagen (puede ser null si no hay imagen)
  // size: tamaño de la imagen (w200, w300, w500, original)
  transform(path: string | null, size: string = 'w500'): string {
    // Si no hay path, retornar un SVG inline como placeholder
    // Usamos un data URI para no depender de servicios externos ni archivos locales
    if (!path) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2luIGltYWdlbjwvdGV4dD48L3N2Zz4=';
    }
    // Concatenar base URL + tamaño + path
    return `${this.baseUrl}${size}${path}`;
  }
}