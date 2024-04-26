import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './movies.state';

export const selectMoviesFeature = createFeatureSelector<MoviesState>('moviesState');

export const selectAllMovies = createSelector(selectMoviesFeature, (state) => state.movies);

export const selectDecades = createSelector(selectMoviesFeature, (state) => state.decades);

export const selectActiveMovie = createSelector(selectMoviesFeature, (state) => state.activeMovie);

export const selectActiveDecade = createSelector(selectMoviesFeature, (state) => state.activeDecade);

export const selectFilteredMovies = createSelector(selectMoviesFeature, (state) => state.filteredMovies);
