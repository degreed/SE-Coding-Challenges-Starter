import { SpectatorService, createServiceFactory, mockProvider } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { MoviesDataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { mockMovies } from '../../../app/tests/mock-data';
import { Constants } from '../../../app/constants/constant';
import { MovieDataService } from '../movie/data.service';

const mockGet = jest.fn().mockReturnValue(of([]));
const mockHttpClient = mockProvider(HttpClient, {
  get: mockGet
});

describe('MoviesDataService', () => {
  let spectator: SpectatorService<MoviesDataService>;
  let service: MoviesDataService;
  const createService = createServiceFactory({
    service: MoviesDataService,
    imports: [],
    declarations: [],
    providers: [mockHttpClient, MovieDataService]
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spectator = createService();
    service = spectator.service;
  });
  test('should create the service', () => {
    expect(service).toBeTruthy();
  });
  test('should return all movies', () => {
    expect(service.getFilteredMovies(mockMovies)).toEqual(mockMovies);
  });
  test('should return only movies from that decade', () => {
    expect(service.getFilteredMovies(mockMovies, 2010)).toEqual([mockMovies[1]]);
  });
  test('should call get method', () => {
    mockGet.mockReturnValueOnce(of({ Response: 'True', Search: mockMovies, totalResults: '2' }));
    mockGet.mockReturnValue(of(mockMovies[1]));
    service.getMovies();
    expect(mockGet).toBeCalledWith(`${Constants.serviceUrl}s=Batman&type=movie`);
  });
});
