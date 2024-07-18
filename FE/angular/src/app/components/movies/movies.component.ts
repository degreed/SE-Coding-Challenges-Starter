import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MoviesDataService } from './data.service';
import { MovieComplete } from '../movie/movie.models';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../app/constants/constant';
import { MovieData } from './movies.models';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public fetchMoviesData$: Observable<MovieData> | undefined;
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];

  constructor(private dataService: MoviesDataService, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle(Constants.moviesHomePage);
    this.fetchMoviesData$ = this.dataService.getMovies().pipe(
      tap((data) => {
        this.decades = data.Decades;
        this.movies = data.Search;
        this.displayMovies();
      })
    );
  }

  displayMovies(decade?: number): void {
    this.currDecade = decade;
    this.filteredMovies = this.dataService.getFilteredMovies(this.movies, decade);
  }
}
