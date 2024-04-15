import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { FacadeService } from './facade.service';
import { MovieComplete } from '../models/models';

export const movieResolver: ResolveFn<Observable<MovieComplete | undefined>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  facade: FacadeService = inject(FacadeService)
): Observable<MovieComplete | undefined> => {
  const movieId: string | null = route.paramMap.get('id');

  return facade.getMovie(movieId);
};
