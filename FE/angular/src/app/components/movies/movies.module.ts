import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { GoDetailsModule } from '../navigation/go-details/go-details.module';
import { DecadesModule } from '../navigation/decades/decades.module';

@NgModule({
  declarations: [MoviesComponent],
  imports: [CommonModule, MovieRoutingModule, GoDetailsModule, DecadesModule]
})
export class MoviesModule {}
