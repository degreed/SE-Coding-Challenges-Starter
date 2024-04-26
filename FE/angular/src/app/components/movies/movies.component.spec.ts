import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { MoviesComponent } from './movies.component';
import { Store } from '@ngrx/store';
import { MockSelector, provideMockStore } from '@ngrx/store/testing';
import { selectActiveDecade, selectDecades, selectFilteredMovies } from 'src/app/store/movies.selectors';
import { initialMoviesState } from 'src/app/store/movies.state';


const mockDecades = [2000];
const mockMovies = [
  {
    Title: 'Mock Movie',
    Year: 2000,
    Rated: 'G',
    Released: '01 Jan 2000',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  },
  {
    Title: 'Mock Movie 2',
    Year: 2011,
    Rated: 'G',
    Released: '01 Jan 2011',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  }
];
const mockselectActiveDecade = {
  selector: selectFilteredMovies,
  value: undefined,
};

const mockselectDecades = {
  selector: selectFilteredMovies,
  value: [],
};

const mockselectFilteredMovies = {
  selector: selectFilteredMovies,
  value: [],
}

const mockStoreProvider = provideMockStore({
  initialState: initialMoviesState,
  selectors: [
    mockselectActiveDecade,
    mockselectDecades,
    mockselectFilteredMovies,
  ],
});

describe('MovieComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [],
    declarations: [],
    providers: [mockStoreProvider],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // describe('displayMovies', () => {
  //   describe('WHEN movies are defined', () => {
  //     beforeEach(() => {
  //       component.displayMovies();
  //     });
  //     test('should set filteredMovies', () => {
  //       expect(component.filteredMovies).toEqual([mockMovies[0]]);
  //     });
  //     describe('AND a decade is passed in', () => {
  //       beforeEach(() => {
  //         component.displayMovies(2000);
  //       });
  //       test('should set currDecade', () => {
  //         expect(component.currDecade).toEqual(2000);
  //       });
  //     });
  //   });
  //   describe('WHEN movies are undefined', () => {
  //     test('should set filteredMovies to an empty array', () => {
  //       component.movies = [];
  //       spectator.detectComponentChanges();
  //       component.displayMovies();
  //       expect(component.filteredMovies).toEqual([]);
  //     });
  //   });
  // });
});
