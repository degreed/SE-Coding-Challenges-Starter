import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, mergeMap } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  private movieSubscription: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.movieSubscription.add(
      this.activatedRoute.params
        .pipe(
          mergeMap(({ id }) => {
            return this.dataService.getMovie(id as string);
          })
        )
        .subscribe((data: MovieComplete) => (this.movie = data))
    );
  }

  public ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
}
