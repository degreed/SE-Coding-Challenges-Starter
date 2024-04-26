import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { DecadesComponent } from './components/navigation/decades/decades.component';
import { GoBackComponent } from './components/navigation/go-back/go-back.component';
import { GoDetailsComponent } from './components/navigation/go-details/go-details.component';
import { GoImdbComponent } from './components/navigation/go-imdb/go-imdb.component';
import { NavigationService } from './components/navigation/navigation.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DataService } from './services/data.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeReducers } from './store/movies.reducers';
import { MoviesStateEffect } from './store/movies.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieComponent,
    SidebarComponent,
    GoBackComponent,
    GoDetailsComponent,
    GoImdbComponent,
    AppComponent,
    DecadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(storeReducers),
    EffectsModule.forRoot([MoviesStateEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    })
  ],
  providers: [DataService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
