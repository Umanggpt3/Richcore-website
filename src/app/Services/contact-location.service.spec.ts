import { TestBed } from '@angular/core/testing';

import { ContactLocationService } from './contact-location.service';

describe('ContactLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactLocationService = TestBed.get(ContactLocationService);
    expect(service).toBeTruthy();
  });
});
