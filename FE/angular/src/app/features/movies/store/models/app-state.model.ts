import { MoviesState } from '../reducers/movies.reducer';

export interface AppState {
  readonly movies: MoviesState;
}
