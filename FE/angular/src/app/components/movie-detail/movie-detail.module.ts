import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail.component';
import { GoImdbModule } from '../navigation/go-imdb/go-imdb.module';
import { GoDetailsModule } from '../navigation/go-details/go-details.module';

@NgModule({
  declarations: [MovieDetailComponent],
  imports: [CommonModule, GoImdbModule, GoDetailsModule],
  exports: [MovieDetailComponent]
})
export class MovieDetailModule {}
