import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActiveDecade, selectDecades, selectFilteredMovies } from 'src/app/store/movies.selectors';
import { setActiveDecade } from 'src/app/store/movies.actions';
import { MovieComplete } from 'src/app/store/types/movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent {
  public currDecade: number | undefined;

  public currDecade$: Observable<number | undefined> = this.store.select(selectActiveDecade);

  public decades$: Observable<number[]> = this.store.select(selectDecades);

  public filteredMovies$: Observable<MovieComplete[]> = this.store.select(selectFilteredMovies);

  constructor(private store: Store) {}

  public displayMovies(activeDecade?: number): void {
    this.currDecade = activeDecade;
    this.store.dispatch(setActiveDecade({ activeDecade }));
  }
}
