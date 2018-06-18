import { TestBed, inject } from '@angular/core/testing';

import { RestbackendApiService } from './restbackend-api.service';

describe('RestbackendApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestbackendApiService]
    });
  });

  it('should be created', inject([RestbackendApiService], (service: RestbackendApiService) => {
    expect(service).toBeTruthy();
  }));
});
