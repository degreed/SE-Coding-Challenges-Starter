import { ActivatedRoute } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { DataService } from '../../services/data.service';
import { MovieComponent } from './movie.component';
import { Store } from '@ngrx/store';
import { initialMoviesState } from 'src/app/store/movies.state';
import { provideMockStore } from '@ngrx/store/testing';
import { selectActiveMovie } from 'src/app/store/movies.selectors';

const mockActivatedRoute = mockProvider(ActivatedRoute, {
  params: jest.fn(),
  snapshot: {
    params: {
      id: '1'
    }
  }
});

const mockselectActiveMovie = {
  selector: selectActiveMovie,
  value: undefined,
}

const mockStoreProvider = provideMockStore({
  initialState: initialMoviesState,
  selectors: [
    mockselectActiveMovie,
  ],
});


describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;
  let component: MovieComponent;
  const createComponent = createComponentFactory({
    component: MovieComponent,
    imports: [],
    declarations: [],
    providers: [mockStoreProvider, mockActivatedRoute],
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
});
