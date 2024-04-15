import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from 'src/app/libs/navigation/navigation.module';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesImageComponent } from './components/movie-image/movie-image.component';
import { MoviesRoutingModule } from './movies.routing.module';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './store/effects/movies.effects';
import { loadMoviesAction } from './store/actions/movies.actions';
import * as moviesFeature from './store/reducers/movies.reducer';
import { FacadeService } from './services/facade.service';

const components = [MovieComponent, MoviesComponent, MoviesImageComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    NavigationModule,
    MoviesRoutingModule,
    StoreModule.forFeature(moviesFeature.MOVIES_FEATURE_KEY, moviesFeature.getMoviesReducer),
    EffectsModule.forFeature([MoviesEffects])
  ],
  providers: [FacadeService]
})
export class MoviesModule {
  constructor(private store: Store<moviesFeature.MoviesState>) {
    this.store.dispatch(loadMoviesAction());
  }
}
