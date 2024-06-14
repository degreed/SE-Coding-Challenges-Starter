import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';

@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MoviesModule { }
