import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MOVIES_FEATURE_KEY, MoviesState } from '../reducers/movies.reducer';
import { MovieComplete, MovieData } from 'src/app/features/movies/models/models';

export interface State {
  movies: MoviesState;
}

export const selectMoviesState = createFeatureSelector<MoviesState>(MOVIES_FEATURE_KEY);

export const selectIsLoading = createSelector(selectMoviesState, (state: MoviesState): boolean => state.loading);

export const selectMovieData = createSelector(
  selectMoviesState,
  (state: MoviesState): MovieData => state.movieData ?? { Search: [], Decades: [] }
);

export const selectMovies = createSelector(selectMovieData, (state: MovieData): MovieComplete[] => state.Search);

// export const selectAMovie = createSelector(selectMovies, (state: MovieComplete[], id: string): MovieComplete => {
//   state.find(({ imdbID }) => id === imdbID);
// });

export const selectDecades = createSelector(selectMovieData, (state: MovieData): number[] => state.Decades);
