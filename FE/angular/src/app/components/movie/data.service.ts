import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Constants } from '../../constants/constant';
import { HttpClient } from '@angular/common/http';
import { MovieComplete, MovieDetails } from './movie.models';

@Injectable()
export class MovieDataService {
  constructor(private http: HttpClient) {}

  public getMovie(id: string): Observable<MovieComplete> {
    return this.http.get<MovieDetails>(`${Constants.serviceUrl}i=${id}`).pipe(
      map(({ Actors, Director, Genre, imdbID, Plot, Poster, Rated, Released, Runtime, Title, Type, Writer, Year }) => ({
        Actors,
        Director,
        Genre,
        imdbID,
        Plot,
        Poster: Poster.replace(Constants.posterUrl, Constants.replacePosterUrl),
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
}
