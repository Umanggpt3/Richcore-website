import { TestBed } from '@angular/core/testing';

import { MailServiceService } from './mail-service.service';

describe('MailServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MailServiceService = TestBed.get(MailServiceService);
    expect(service).toBeTruthy();
  });
});
