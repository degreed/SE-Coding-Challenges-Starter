import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Movie, MoviesState } from './movies.state';
import { Store } from '@ngrx/store';
import { getMovies, getMoviesSuccess, initializeStore, setIdsAndDecades } from './movies.actions';
import { Observable, filter, forkJoin, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { selectAllMovies } from './movies.selectors';
import { DataService } from '../services/data.service';
import { MovieComplete } from './types/movies';

@Injectable()
export class MoviesStateEffect {
  constructor(private actions$: Actions, private store: Store<MoviesState>, private dataService: DataService) {}

  initializeStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initializeStore),
      withLatestFrom(this.store.select(selectAllMovies)),
      filter(([, moviesLoaded]) => moviesLoaded.length === 0),
      switchMap(() =>
        this.dataService.getMovies().pipe(
          mergeMap(({ Search }) => {
            // forkJoin(
            const ids: string[] = [];
            const decades: number[] = [];
            Search.map(({ imdbID, Year }) => {
              const decade = Math.ceil(parseInt(Year as unknown as string) / 10) * 10 - 10;
              if (decades.indexOf(decade) < 0) {
                decades.push(decade);
              }

              ids.push(imdbID);
            });

            return [setIdsAndDecades({ decades: decades.sort((a, b) => a - b), ids }), getMovies({ ids })];
          })
        )
      )
    )
  );

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMovies),
      mergeMap(({ ids }) => {
        const m: Observable<MovieComplete>[] = ids.map((id) => this.dataService.getMovie(id));

        return forkJoin(m);
      }),
      map((movies: Movie[]) => {
        const sortedMovies = movies.sort(
          ({ Year: year1 }: MovieComplete, { Year: year2 }: MovieComplete) => year1 - year2
        );
        return getMoviesSuccess({ movies: sortedMovies });
      })
    )
  );
}
