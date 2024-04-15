import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MovieComplete } from 'src/app/features/movies/models/models';
import { FacadeService } from '../../services/facade.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit, OnDestroy {
  public decades: number[] = [];
  public filteredMovies$: Observable<MovieComplete[]>;
  private subscription: Subscription = new Subscription();

  constructor(public facade: FacadeService) {}

  public ngOnInit(): void {
    this.filteredMovies$ = this.facade.getMovies();
    this.subscription.add(
      this.facade.getDecades().subscribe((decades: number[]) => {
        this.decades = decades;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public displayMovies(decade?: number): void {
    if (decade) this.facade.filterByDecade(decade);
  }

  public trackBy(index: number, movie: MovieComplete) {
    return movie.imdbID;
  }
}
