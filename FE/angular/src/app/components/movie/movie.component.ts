import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setActiveMovieId } from 'src/app/store/movies.actions';
import { selectActiveMovie } from 'src/app/store/movies.selectors';
import { MovieComplete } from 'src/app/store/types/movies';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movie$: Observable<MovieComplete | undefined> = this.store.select(selectActiveMovie);

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  public ngOnInit() {
    if (this.activatedRoute.snapshot.params.id) {
      const activeMovieId: string = this.activatedRoute.snapshot.params.id as string;
      this.store.dispatch(setActiveMovieId({ activeMovieId }));
    }
  }
}
