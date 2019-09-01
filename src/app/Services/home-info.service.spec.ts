import { TestBed } from '@angular/core/testing';

import { HomeInfoService } from './home-info.service';

describe('HomeInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeInfoService = TestBed.get(HomeInfoService);
    expect(service).toBeTruthy();
  });
});
