import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MovieDataService } from '../movie/data.service';
import { MovieComplete } from '../movie/movie.models';
import { MovieData, SearchResults } from './movies.models';
import { Constants } from '../../constants/constant';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MoviesDataService {
  private storedMovies: MovieData = { Search: [], Decades: [] };
  private decades: number[] = [];

  constructor(private http: HttpClient, private movieDataAccess: MovieDataService) {}

  public getFilteredMovies(movies: MovieComplete[], decade?: number): MovieComplete[] {
    if (!decade) {
      return movies;
    }

    const decadeLimit = decade + 10;
    return movies.filter((movie) => movie.Year >= decade && movie.Year < decadeLimit);
  }

  public getMovies(): Observable<MovieData> {
    if (this.storedMovies && this.storedMovies.Search.length) {
      return of(this.storedMovies);
    }

    return this.http.get<SearchResults>(`${Constants.serviceUrl}s=Batman&type=movie`).pipe(
      mergeMap(({ Search }) =>
        forkJoin(
          Search.map(({ imdbID, Year }) => {
            // add decade to decades
            const decade = Math.ceil(parseInt(Year as string) / 10) * 10 - 10;
            if (this.decades.indexOf(decade) < 0) {
              this.decades.push(decade);
            }
            return this.movieDataAccess.getMovie(imdbID);
          })
        )
      ),
      map((Search) => {
        Search = Search.sort(({ Year: year1 }: MovieComplete, { Year: year2 }: MovieComplete) => year1 - year2);
        this.decades.sort((a, b) => a - b);
        this.storedMovies = { Search, Decades: this.decades };

        return this.storedMovies;
      })
    );
  }
}
