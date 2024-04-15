import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MovieComplete, MovieData, MovieDetails, SearchResults } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private posterUrl = 'https://m.media-amazon.com/images/M/';
  private replacePosterUrl = '/assets/images/';

  constructor(private http: HttpClient) {}

  public getMovie(id: string): Observable<MovieComplete> {
    return this.http.get<MovieDetails>(`&i=${id}`).pipe(
      map(({ Actors, Director, Genre, imdbID, Plot, Poster, Rated, Released, Runtime, Title, Type, Writer, Year }) => ({
        Actors,
        Director,
        Genre,
        imdbID,
        Plot,
        Poster: Poster.replace(this.posterUrl, this.replacePosterUrl),
        Rated,
        Released,
        Runtime,
        Title,
        Type,
        Writer,
        Year: parseInt(Year as string)
      }))
    );
  }

  public getMovies(): Observable<MovieData> {
    return this.http.get<SearchResults>(`&s=Batman&type=movie`).pipe(
      mergeMap(({ Search }) =>
        forkJoin(
          Search.map(({ imdbID }) => {
            return this.getMovie(imdbID);
          })
        )
      ),
      map((Search: MovieComplete[]) => {
        // add decade to decades
        const decadesSet = new Set(
          Search.map(({ Year }) => {
            const decade = Math.ceil(Year / 10) * 10 - 10;
            return decade;
          })
        );
        const decades = Array.from(decadesSet).sort((a, b) => a - b);

        Search = Search.sort(({ Year: year1 }: MovieComplete, { Year: year2 }: MovieComplete) => year1 - year2);

        return { Search, Decades: decades };
      })
    );
  }
}
