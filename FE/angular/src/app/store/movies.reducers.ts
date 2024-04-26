import { createReducer, on } from '@ngrx/store';
import { initialMoviesState } from './movies.state';
import { getMoviesSuccess, setActiveDecade, setActiveMovieId, setIdsAndDecades } from './movies.actions';

export const moviesStateReducer = createReducer(
  initialMoviesState,

  on(setIdsAndDecades, (state, { decades, ids }) => ({
    ...state,
    ids,
    decades
  })),

  on(getMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
    filteredMovies: movies
  })),

  on(setActiveDecade, (state, { activeDecade }) => ({
    ...state,
    activeDecade
  })),

  on(setActiveMovieId, (state, { activeMovieId }) => ({
    ...state,
    activeMovieId,
    activeMovie: state.movies.find((movie) => movie.id === activeMovieId)
  })),

  on(setActiveDecade, (state, { activeDecade }) => {
    let filteredMovies = state.movies;

    if (activeDecade) {
      const decadeLimit = activeDecade + 10;
      filteredMovies = state.movies.filter((movie) => movie.Year >= activeDecade && movie.Year < decadeLimit);
    }

    return {
      ...state,
      filteredMovies
    };
  })
);

export const storeReducers = {
  ['moviesState']: moviesStateReducer
};
