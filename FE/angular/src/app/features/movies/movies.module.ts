import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationModule } from 'src/app/libs/navigation/navigation.module';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesImageComponent } from './components/movie-image/movie-image.component';

const components = [MovieComponent, MoviesComponent, MoviesImageComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [BrowserModule, NavigationModule],
  providers: []
})
export class MoviesModule {}
