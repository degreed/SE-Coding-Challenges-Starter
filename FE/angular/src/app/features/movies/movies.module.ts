import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from 'src/app/libs/navigation/navigation.module';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesImageComponent } from './components/movie-image/movie-image.component';
import { MoviesRoutingModule } from './movies.routing.module';

const components = [MovieComponent, MoviesComponent, MoviesImageComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, NavigationModule, MoviesRoutingModule],
  providers: []
})
export class MoviesModule {}
