import { ActivatedRoute } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { DataService } from '../../services/data.service';
import { MovieComponent } from './movie.component';
import { of } from 'rxjs';
import { mockMovies } from '../../tests/mock-data';

const mockActivatedRoute = mockProvider(ActivatedRoute, {
  params: of(({id: 'tt123'}))
});
const mockDataService = mockProvider(DataService, {
  getMovie: jest.fn().mockReturnValue(of({ ...mockMovies[0] }))
});

describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;
  let component: MovieComponent;
  const createComponent = createComponentFactory({
    component: MovieComponent,
    imports: [],
    declarations: [],
    providers: [mockActivatedRoute, mockDataService],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    component.ngOnInit();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should have the expected movie id', () => {
    expect(component.movieId).toBe('tt123')
  })

  test('should not have the following movie id', () => {
    expect(component.movieId).not.toBe('tt124')
  })
});
