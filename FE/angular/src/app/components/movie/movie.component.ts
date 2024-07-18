import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { MovieDataService } from './data.service';
import { MovieComplete } from './movie.models';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../app/constants/constant';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movie: MovieComplete;
  public movieId = '';

  /* Replaced the subscription and handling it as observable with async pipe */
  public movie$: Observable<MovieComplete>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieDataService: MovieDataService,
    private title: Title
  ) {}

  public ngOnInit() {
    this.title.setTitle(Constants.movieDetailPage);

    this.movie$ = this.activatedRoute.params.pipe(
      map((params: Params) => params.id),
      switchMap((movieId: string) => this.movieDataService.getMovie(movieId))
    );
  }
}
