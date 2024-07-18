import { HttpClient } from '@angular/common/http';
import { mockProvider, SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { MovieDataService } from './data.service';
import { mockMovies } from '../../../app/tests/mock-data';
import { Constants } from '../../../app/constants/constant';

const mockGet = jest.fn().mockReturnValue(of([]));
const mockHttpClient = mockProvider(HttpClient, {
  get: mockGet
});

describe('MovieDataService', () => {
  let spectator: SpectatorService<MovieDataService>;
  let service: MovieDataService;
  const createService = createServiceFactory({
    service: MovieDataService,
    imports: [],
    declarations: [],
    providers: [mockHttpClient]
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spectator = createService();
    service = spectator.service;
  });

  test('http method should return the desired result', () => {
    expect(service).toBeTruthy();
    mockGet.mockReturnValueOnce(of(mockMovies[1]));
    service.getMovie(mockMovies[1].imdbID);
    expect(mockGet).toBeCalledWith(`${Constants.serviceUrl}i=${mockMovies[1].imdbID}`);
  });
});
