import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MovieComplete } from '../models/models';
import { Store } from '@ngrx/store';
import { MoviesState } from '../store/reducers/movies.reducer';
import { selectDecades, selectIsLoading, selectMovies } from '../store/selectors/selectors';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  public currDecade$: Observable<number | undefined>;
  private currDecadeSubject: Subject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private filterYear$: Observable<number>;
  private filterYearSubject: Subject<number> = new Subject();

  constructor(private store: Store<MoviesState>) {
    this.currDecade$ = this.currDecadeSubject.asObservable();
    this.filterYear$ = this.filterYearSubject.asObservable();
  }

  public getDecades(): Observable<number[]> {
    return this.store.select(selectDecades).pipe(
      map((decades: number[]) => {
        return Array.isArray(decades) ? decades : [];
      })
    );
  }

  public getMovie(id: string | null | undefined): Observable<MovieComplete | undefined> {
    return this.store.select(selectMovies).pipe(
      map((movies: MovieComplete[]) => {
        return movies?.find((movie: MovieComplete) => movie.imdbID === id);
      })
    );
  }

  public isReady(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(filter((loading: boolean) => !loading));
  }

  public getMovies(): Observable<MovieComplete[]> {
    return merge(of(undefined), this.filterYear$).pipe(
      mergeMap((decade: number | undefined) => {
        return this.store.select(selectMovies).pipe(
          map((movies: MovieComplete[]) => {
            return this.filterMovies(movies, decade);
          })
        );
      })
    );
  }

  public filterByDecade(decade: number) {
    this.filterYearSubject.next(decade);
  }

  public filterMovies(movies: MovieComplete[] = [], decade?: number): MovieComplete[] {
    if (!decade) {
      return movies;
    }

    this.currDecadeSubject.next(decade);
    const decadeLimit = decade + 10;
    return movies.filter((movie) => movie.Year >= decade && movie.Year < decadeLimit);
  }
}
