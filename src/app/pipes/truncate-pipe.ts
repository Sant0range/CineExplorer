// truncate.pipe.ts
// Pipe que trunca texto largo y agrega "..." al final
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // name: nombre que se usa en el template con |
  name: 'truncate',
  // standalone: true para poder importarlo directamente
  standalone: true
})
// PipeTransform obliga a implementar el método transform()
export class TruncatePipe implements PipeTransform {
  // transform recibe el valor original y parámetros opcionales
  // value: el texto a truncar
  // limit: máximo de caracteres (por defecto 100)
  // trail: texto que se agrega al final (por defecto "...")
  transform(value: string, limit: number = 100, trail: string = '...'): string {
    // Si no hay valor, retornar vacío
    if (!value) return '';
    // Si el texto es más corto que el límite, retornarlo completo
    if (value.length <= limit) return value;
    // Cortar el texto y agregar el trail
    return value.substring(0, limit).trim() + trail;
  }
}