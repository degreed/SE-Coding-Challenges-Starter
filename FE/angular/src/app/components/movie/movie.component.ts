import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId = '';
  private movieSubscription: Subscription;
  private activatedRouteSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.params
      .pipe(
        tap((params: Params) => {
          const { id } = params as { id: string };
          this.movieId = id;
        })
      )
      .subscribe();
    this.movieSubscription = this.dataService
      .getMovie(this.movieId)
      .pipe(tap((data) => (this.movie = data)))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
    this.activatedRouteSubscription.unsubscribe();
  }
}
