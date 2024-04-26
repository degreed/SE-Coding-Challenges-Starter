import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieComplete, MovieDetails, SearchResults } from '../store/types/movies';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private posterUrl = 'https://m.media-amazon.com/images/M/';
  private replacePosterUrl = '/assets/images/';
  private serviceUrl = 'https://www.omdbapi.com/?apikey=f59b2e4b&';

  constructor(private http: HttpClient) {}
  //set error handling
  public getMovie(id: string): Observable<MovieComplete> {
    console.log('id', id);
    return this.http.get<MovieDetails>(`${this.serviceUrl}i=${id}`).pipe(
      map(({ Actors, Director, Genre, imdbID, Plot, Poster, Rated, Released, Runtime, Title, Type, Writer, Year }) => ({
        Actors,
        Director,
        Genre,
        imdbID,
        Plot,
        Poster: Poster?.replace(this.posterUrl, this.replacePosterUrl),
        Rated,
        Released,
        Runtime,
        Title,
        Type,
        Writer,
        id: imdbID,
        Year: parseInt(Year as string)
      }))
    );
  }

  public getMovies() {
    return this.http.get<SearchResults>(`${this.serviceUrl}s=Batman&type=movie`);
  }
}
