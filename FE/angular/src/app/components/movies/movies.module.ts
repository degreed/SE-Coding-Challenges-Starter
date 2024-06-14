import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { GoDetailsModule } from '../navigation/go-details/go-details.module';
import { DecadesModule } from '../navigation/decades/decades.module';
import { MovieDataService } from '../movie/data.service';
import { MoviesDataService } from './data.service';

@NgModule({
  declarations: [MoviesComponent],
  imports: [CommonModule, MovieRoutingModule, GoDetailsModule, DecadesModule],
  providers: [MovieDataService, MoviesDataService]
})
export class MoviesModule {}
