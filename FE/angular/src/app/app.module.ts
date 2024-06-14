import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationService } from './components/navigation/navigation.service';
import { MovieModule } from './components/movie/movie.module';
import { MoviesModule } from './components/movies/movies.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MovieModule, MoviesModule],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
