import { MovieComplete } from './types/movies';

export interface Movie {
  id: string;
  Actors: string;
  Director: string;
  Genre: string;
  imdbID: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: number;
}

export type MoviesState = {
  ids: string[];
  movies: MovieComplete[];
  decades: number[];
  activeMovieId: string | undefined;
  activeDecade: number | undefined;
  activeMovie: MovieComplete | undefined;
  filteredMovies: MovieComplete[];
};

export const initialMoviesState: MoviesState = {
  ids: [],
  movies: [],
  decades: [],
  activeMovieId: undefined,
  activeDecade: undefined,
  activeMovie: undefined,
  filteredMovies: []
};
