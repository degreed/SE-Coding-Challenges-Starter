import { Component, Input } from '@angular/core';
import { MovieComplete } from '../movie/movie.models';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  @Input() isMovies = false;

  @Input() movie: MovieComplete;
}
