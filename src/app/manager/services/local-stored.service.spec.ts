import { TestBed } from '@angular/core/testing';

import { LocalStoredService } from './local-stored.service';

describe('StoredDataService', () => {
  let service: LocalStoredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStoredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
