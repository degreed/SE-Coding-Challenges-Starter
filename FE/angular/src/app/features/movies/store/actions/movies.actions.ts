import { createAction, props } from '@ngrx/store';
import { MovieComplete, MovieData } from '../../models/models';

export enum MoviesActionTypes {
  GET_A_MOVIE = '[SHOPPING] Add Item',
  GET_MOVIES = '[SHOPPING] Add Item Success',
  LOAD_MOVIES = '[MOVIES] Load Movies',
  LOAD_MOVIES_SUCCESS = '[MOVIES] Load Movies Success',
  LOAD_MOVIES_FAILURE = '[MOVIES] Load Movies Failure'
}

export const getMovieAction = createAction(MoviesActionTypes.GET_A_MOVIE, props<{ movie: MovieComplete }>());

export const getMoviesAction = createAction(MoviesActionTypes.GET_MOVIES, props<{ movies: MovieComplete[] }>());

export const loadMoviesAction = createAction(MoviesActionTypes.LOAD_MOVIES);

export const loadMoviesSuccessAction = createAction(
  MoviesActionTypes.LOAD_MOVIES_SUCCESS,
  props<{ movieData: MovieData }>()
);

export const loadMoviesFailureAction = createAction(MoviesActionTypes.LOAD_MOVIES_FAILURE, props<{ error: Error }>());
