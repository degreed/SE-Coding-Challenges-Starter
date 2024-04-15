import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { MoviesComponent } from './movies.component';
import { FacadeService } from '../../services/facade.service';

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

const mockGetMovies = jest.fn().mockReturnValue(of(mockMovies));
const mockGetDecades = jest.fn().mockReturnValue(of(mockDecades));
const mockGetFilteredMovies = jest.fn().mockReturnValue(of([mockMovies[0]]));
const mockFacadeService = mockProvider(FacadeService, {
  getMovies: mockGetMovies,
  filterMovies: mockGetFilteredMovies,
  getDecades: mockGetDecades
});

describe('MovieComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [],
    declarations: [],
    providers: [mockFacadeService],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    test('should set decades', () => {
      expect(component.decades).toEqual(mockDecades);
    });
    /* movies array was removed, movies are in the store */
    // test('should set movies array', () => {
    //   expect(component.movies).toEqual(mockMovies);
    // });
  });

  describe('displayMovies', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    describe('WHEN movies are defined', () => {
      beforeEach(() => {
        component.displayMovies();
      });
      test('should set filteredMovies', (done) => {
        component.filteredMovies$.subscribe((movies) => {
          expect(movies).toEqual(mockMovies);
          done();
        });
      });
      /* This test belongs to facade */
      // describe('AND a decade is passed in', () => {
      //   beforeEach(() => {
      //     component.displayMovies(2000);
      //   });
      //   test('should set currDecade', (done) => {
      //     component.currDecade$.subscribe((decade) => {
      //       expect(decade).toEqual(2000);
      //       done();
      //     });
      //   });
      // });
    });
    /* this test belongs to facade */
    // describe('WHEN movies are undefined', () => {
    //   test('should set filteredMovies to an empty array', () => {
    //     component.movies = [];
    //     spectator.detectComponentChanges();
    //     component.displayMovies();
    //     expect(component.filteredMovies).toEqual([]);
    //   });
    // });
  });
});
