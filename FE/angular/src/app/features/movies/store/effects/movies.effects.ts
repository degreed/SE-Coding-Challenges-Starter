import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { loadMoviesFailureAction, loadMoviesSuccessAction, MoviesActionTypes } from '../actions/movies.actions';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { MovieData } from '../../models/models';

@Injectable()
export class MoviesEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActionTypes.LOAD_MOVIES),
      mergeMap(() =>
        this.dataService.getMovies().pipe(
          map((movieData: MovieData) => loadMoviesSuccessAction({ movieData })),
          catchError((error: Error) => of(loadMoviesFailureAction({ error })))
        )
      )
    )
  );
}
