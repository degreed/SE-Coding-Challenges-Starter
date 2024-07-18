export interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string | number;
}

export interface MovieComplete extends MovieDetails {
  Year: number;
}

export interface MovieDetails extends Movie {
  Actors: string;
  Director: string;
  Genre: string;
  Plot: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Writer: string;
}

export interface MovieComplete extends MovieDetails {
  Year: number;
}
