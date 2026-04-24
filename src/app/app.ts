import { Component, signal } from '@angular/core';
import { MovieCardComponent } from './components/movie-card/movie-card';

@Component({
  selector: 'app-root',
  imports: [MovieCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cine-explorer');
}
