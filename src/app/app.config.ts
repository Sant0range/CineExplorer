// app.config.ts
// Configuración global de la aplicación
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// provideHttpClient habilita HttpClient en toda la app
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiKeyInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // withInterceptors registra los interceptores
    provideHttpClient(withInterceptors([apiKeyInterceptor]))
  ]
};
