import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MoviesModule } from './features/movies/movies.module';
import { NavigationModule } from './libs/navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MoviesModule, NavigationModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
