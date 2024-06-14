import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MoviesDataService } from './data.service';
import { MovieComplete } from '../movie/movie.models';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constant';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnDestroy, OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];
  private moviesSubscription: Subscription;

  constructor(private dataService: MoviesDataService, private title: Title) {}

  public ngOnInit(): void {
    this.title.setTitle(Constants.moviesHomePage);
    this.moviesSubscription = this.dataService
      .getMovies()
      .pipe(
        tap((data) => {
          this.decades = data.Decades;
          this.movies = data.Search;
          this.displayMovies();
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
  }

  public displayMovies(decade?: number): void {
    if (!this.movies?.length) {
      this.filteredMovies = [];
      return;
    }

    this.currDecade = decade;
    this.filteredMovies = this.dataService.getFilteredMovies(this.movies, decade);
  }
}
