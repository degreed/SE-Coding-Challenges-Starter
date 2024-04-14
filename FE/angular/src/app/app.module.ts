import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MoviesModule } from './features/movies/movies.module';
import { BaseUrlInterceptor } from './interceptor/base-url.interceptor';
import { NavigationModule } from './libs/navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MoviesModule, NavigationModule],
  providers: [
    { provide: 'BASE_API_URL', useValue: 'https://www.omdbapi.com/?apikey=f59b2e4b' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
