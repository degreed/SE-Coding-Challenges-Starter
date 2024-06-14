import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { GoBackModule } from '../navigation/go-back/go-back.module';
import { GoImdbModule } from '../navigation/go-imdb/go-imdb.module';


@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    GoBackModule,
    GoImdbModule
  ]
})
export class MovieModule { }
