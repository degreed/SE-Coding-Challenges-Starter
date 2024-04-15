import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { MovieComplete } from 'src/app/features/movies/models/models';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete | undefined;
  public titleAndYear = '';
  private movieSubscription: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.movieSubscription.add(
      this.activatedRoute.data
        .pipe(
          map((data: Data) => {
            return data && data['movie'] ? <MovieComplete>data['movie'] : undefined;
          })
        )
        .subscribe((movie: MovieComplete | undefined) => {
          this.movie = movie;
          if (this.movie && this.movie.Title && this.movie.Year) {
            const year = String(this.movie.Year);
            this.titleAndYear = this.movie.Title + ' (' + year + ')';
          }
        })
    );
  }

  public ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
}
