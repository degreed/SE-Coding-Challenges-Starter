import { createReducer, on } from '@ngrx/store';
import {
  getMoviesAction,
  loadMoviesAction,
  loadMoviesSuccessAction,
  loadMoviesFailureAction
} from '../actions/movies.actions';
import { MovieData } from 'src/app/features/movies/models/models';
import { Action } from 'rxjs/internal/scheduler/Action';

export const MOVIES_FEATURE_KEY = 'movies';

export interface MoviesState {
  movieData?: MovieData;
  loading: boolean;
  error: Error | null | undefined;
}

export const initialState: MoviesState = {
  movieData: undefined,
  loading: false,
  error: undefined
};

const moviesReducer = createReducer(
  initialState,
  on(getMoviesAction, (state) => {
    return { ...state, loading: false, error: null };
  }),
  on(loadMoviesAction, (state) => {
    return { ...state, loading: true, error: null };
  }),
  on(loadMoviesSuccessAction, (state, action) => {
    return { ...state, loading: false, error: null, movieData: action?.movieData };
  }),
  on(loadMoviesFailureAction, (state, action) => {
    return { ...state, loading: false, error: action.error };
  })
);

export function getMoviesReducer(state: MoviesState | undefined, action: Action<string>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return moviesReducer(state, action);
}
