import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { DataService, MovieComplete, MovieData } from '../../services/data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnDestroy, OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];
  private moviesSubscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.moviesSubscription.add(
      this.dataService
        .getMovies()
        .pipe(
          tap((data: MovieData) => {
            this.decades = data.Decades;
            this.movies = data.Search;
            this.displayMovies();
          })
        )
        .subscribe()
    );
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
