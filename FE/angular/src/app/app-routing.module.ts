import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesModule } from './features/movies/movies.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/movies/movies.module').then((m) => m.MoviesModule)
  }
];

@NgModule({
  imports: [MoviesModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
