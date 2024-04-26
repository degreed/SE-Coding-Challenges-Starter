import { createAction, props } from '@ngrx/store';
import { MovieComplete } from './types/movies';

export const initializeStore = createAction('[Movies State] Initialize Store');

export const getMovies = createAction('[Movies State] Get Movies', props<{ ids: string[] }>());

export const setIdsAndDecades = createAction(
  '[Movies State] Set Ids and Decades',
  props<{ decades: number[]; ids: string[] }>()
);

export const getMoviesSuccess = createAction('[Movies State] Get Movies Success', props<{ movies: MovieComplete[] }>());

export const setActiveDecade = createAction(
  '[Movies State] Set Active DEcade',
  props<{ activeDecade: number | undefined }>()
);

export const setActiveMovieId = createAction(
  '[Movies State] Set Active MovieId',
  props<{ activeMovieId: string | undefined }>()
);
