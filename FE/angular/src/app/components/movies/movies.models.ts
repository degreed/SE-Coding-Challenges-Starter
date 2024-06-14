import { Movie, MovieComplete } from '../movie/movie.models';

export interface SearchResults {
  Response: string;
  Search: Movie[];
  totalResults: string;
}

export interface MovieData {
  Decades: number[];
  Search: MovieComplete[];
}
