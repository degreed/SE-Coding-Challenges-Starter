import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { MoviesDataService } from './data.service';
import { MoviesComponent } from './movies.component';
import { mockDecades, mockMovies } from '../../tests/mock-data';

const mockGetMovies = jest.fn().mockReturnValue(of({ Decades: mockDecades, Search: mockMovies }));
const mockGetFilteredMovies = jest.fn().mockReturnValue([mockMovies[0]]);
const mockDataService = mockProvider(MoviesDataService, {
  getMovies: mockGetMovies,
  getFilteredMovies: mockGetFilteredMovies
});

describe('MoviesComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    providers: [mockDataService],
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    component.ngOnInit();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should set decades', () => {
    expect(component.decades).toEqual(mockDecades);
  });

  test('should set movies array', () => {
    expect(component.movies).toEqual(mockMovies);
  });

  test('should set filteredMovies', () => {
    component.displayMovies();
    expect(component.filteredMovies).toEqual([mockMovies[0]]);
  });

  test('should set currDecade', () => {
    component.displayMovies(2000);
    expect(component.currDecade).toEqual(2000);
  });

  test('should set filteredMovies to an empty array', () => {
    component.movies = [];
    spectator.detectComponentChanges();
    component.displayMovies();
    expect(component.filteredMovies).toEqual([]);
  });
});
